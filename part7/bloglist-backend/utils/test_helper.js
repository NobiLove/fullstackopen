const Blog = require('../models/blog')
const User = require('../models/user')

// ...

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const initialBlogs = [
    {
        title: "nobi",
        author: "nobilove",
        url: "nobi.com",
        likes: 0
    },
    {
        title: "nobi2",
        author: "nobilove2",
        url: "nobi.com2",
        likes: 0
    },
    {
        title: "nobi3",
        author: "nobilove3",
        url: "nobi.com3",
        likes: 0
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: "asd",
        author: "asd",
        url: "asd",
        likes: 0
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}