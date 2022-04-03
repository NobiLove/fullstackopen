const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('root', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'nobilove',
            name: 'Nobi Love',
            password: 'password',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'root',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('48', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.author)

        expect(response.body.likes).toBeDefined()
        expect(response.body.likes).toBe(0)
    })

    test('49', async () => {
        const newBlog = {
            title: "nobi4",
            author: "nobilove4",
            url: "nobi.com4",
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.id).toBeDefined()
        //expect(response.body.likes).toBe(0)
    })

    test('410', async () => {
        const newUser = {
            username: 'root',
            password: 'root',
        }

        const response = await api
            .post('/api/login')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: "nobi4",
            author: "nobilove4",
            url: "nobi.com4",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${response.body.token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(n => n.author)
        expect(contents).toContain(
            'nobilove'
        )
    })

    test('fail add blog without token', async () => {

        const newBlog = {
            title: "nobi4",
            author: "nobilove4",
            url: "nobi.com4",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set('Authorization', ``)
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('411', async () => {
        const newBlog = {
            title: "nobi4",
            author: "nobilove4",
            url: "nobi.com4",
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('412', async () => {
        const newBlog = {
            author: "nobilove4",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const contents = blogsAtEnd.map(r => r.author)

        expect(contents).not.toContain(blogToDelete.author)
    })

    test('the first blog is about HTTP methods', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].author).toBe('nobilove')
    })

})
afterAll(() => {
    mongoose.connection.close()
})