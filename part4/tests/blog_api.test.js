const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    // const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    // const promiseArray = blogObjects.map(b => b.save())
    // await Promise.all(promiseArray)
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('4.8 all blogs are returned', async () => {
    const blogs = await helper.blogsInDB()

    assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

test('4.9 a specific id field is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.id)
    assert.strictEqual(contents.length, helper.initialBlogs.length)
})

test('4.10 verify a new blog is created in the DB', async () => {
    const newBlog = {
        title: 'Test insert',
        author: 'ME',
        url: 'http://localhost/addAnEntry',
        likes: 4,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()
    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
})

test('4.11 default likes to 0 if not provided', async () => {
    const missingLikesBlog = {
        title: 'Missing Likes insert',
        author: 'ME',
        url: 'http://localhost/missingLikes',
    }

    await api
        .post('/api/blogs/')
        .send(missingLikesBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()
    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
    const blg = blogs.filter(b => {
        return b.title === 'Missing Likes insert'
    })
    assert.strictEqual(blg[0].likes, 0)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const firstBlog = blogsAtStart[1]

    const result = await api
        .get(`/api/blogs/${firstBlog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(result.body, firstBlog)
})

test('4.12a blog missing title', async () => {
    const newBlog = {
        author: 'ME',
        url: 'http://localhost/missingTitle',
        likes: 4,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('4.12b blog missing url', async () => {
    const newBlog = {
        title: 'Missing title field throws 400',
        author: 'ME',
        likes: 4,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('4.13 delete a specific blog', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const firstBlog = blogsAtStart[1]

    await api
        .delete(`/api/blogs/${firstBlog.id}`)
        .expect(204)
})

test('4.14 update likes on a blog post', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const firstBlog = blogsAtStart[0]
    const likeStart = firstBlog.likes

    firstBlog.likes = likeStart + 1

    result = await api.put(`/api/blogs/${firstBlog.id}`)
        .send(firstBlog)
        .expect(200)

    assert.strictEqual(result.body.likes, likeStart + 1)
})

after(async () => {
  await mongoose.connection.close()
})