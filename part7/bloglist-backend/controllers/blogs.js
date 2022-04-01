const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
    response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('comments', { content: 1 })
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'title or url is missing' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const blogToReturn = await Blog
        .findById(savedBlog._id)
        .populate('user', { username: 1, name: 1 })
        .populate('comments', { content: 1 })
    response.status(201).json(blogToReturn)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const blog = await Blog.findById(request.params.id)
    const comment = new Comment({
        content: body.content,
        blog: blog._id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    const commentToReturn = await Comment
        .findById(savedComment._id)
        .populate('blog', { title: 1, author: 1, url: 1 })

    response.status(201).json(commentToReturn)
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .populate('user', { username: 1, name: 1 })
        .populate('comments', { content: 1 })
    response.json(updatedBlog)
})

module.exports = blogsRouter