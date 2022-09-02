const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    userid: 0,
    likes: 0
  })
  response.status(200).json(users)
})

userRouter.post('/', async (request, response, next) => {
  const user = request.body
  const password = user.password
  if (password.length > 3) {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      username: user.username,
      name: user.name,
      password: passwordHash
    })
    try {
      await newUser.save()
      response.status(201).json(newUser)
    } catch (err) {
      next(err)
    }
  } else {
    response.status(400).json({
      error: 'password length must be greater than 3'
    })
  }
})

userRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await User.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = userRouter
