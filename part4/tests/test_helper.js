const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'My First Blog Post',
        author: 'ME',
        url: 'http://localhost/something',
        likes: 4,
    },
    {
        title: 'My Next Blog Post',
        author: 'ME',
        url: 'http://localhost/somethingSpecial',
        likes: 123,
    },
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB, usersInDB
}