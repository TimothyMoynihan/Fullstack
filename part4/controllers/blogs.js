const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   console.log('auth', authorization)
//   if(authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(b => {
      if (b) {
        response.json(b)
      } else {
        response.status(404).end()
      }
    })
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    // const decodeToken = jwt.verify(request.token, process.env.SECRET)
    // if(!decodeToken.id) {
    //   return response.status(401).json({ error: 'token invalid' })
    // }

    // const user = await User.findById(decodeToken.id)
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // const decodeToken = jwt.verify(request.token, process.env.SECRET)
  // if(!decodeToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodeToken.id)
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() === user.id.toString()) {
    // console.log('found match... you may delete')
    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter((b) => b !== request.params.id)
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Invalid User to delete this Blog'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
    await Blog.findById(request.params.id)
      .then(blog => {
        if(!blog) {
          return response.status(404).end()
        }

        blog.likes = request.body.likes

        return blog.save().then((updatedBlog) => {
          response.json(updatedBlog)
        })
      })
})

module.exports = blogsRouter