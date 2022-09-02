const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const UserExtractor = require('../middleware/userExtractor')
const userExtractor = require('../middleware/userExtractor')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('userid', {
      blogs: 0
    })
    .then(blogs => {
      response.status(200).json(blogs)
    })
})

blogRouter.post('/', UserExtractor, async (request, response, next) => {
  const id = request.userid
  let newblog
  const user = await User.findById(id)
  if ((request.body.likes === null) || (request.body.likes === undefined)) {
    const blog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0,
      userid: user._id
    }
    newblog = new Blog(blog)
  } else {
    const blog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      userid: user._id
    }
    newblog = new Blog(blog)
  }
  try {
    const savedBlog = await newblog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const idblog = request.params.id
  const iduser = request.userid
  try {
    const blog = await Blog.findOne({ _id: idblog })
    if (blog.userid.toString() === iduser) {
      await Blog.findByIdAndDelete(idblog)
      response.status(204).end()
    } else {
      response.status(401).json({
        error: 'this blog cant be deleted by this users'
      })
    }
  } catch (err) {
    next(err)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const idblog = request.params.id
  const newblog = request.body
  try {
    const result = await Blog.findByIdAndUpdate(idblog, newblog, { new: true })
    response.json(result)
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter
