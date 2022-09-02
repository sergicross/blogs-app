const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const SECRET = process.env.SECRET

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body
  try {
    const userDB = await User.findOne({ username })
    const passwordCorrect = userDB === null
      ? false
      : await bcrypt.compare(password, userDB.password)

    if (!passwordCorrect) {
      response.status(400).json({
        error: 'username or password are invalid'
      })
    } else {
      const userfortoken = {
        id: userDB._id,
        username: userDB.username
      }
      const token = jwt.sign(userfortoken, SECRET, {
        expiresIn: 60 * 60 * 24
      })
      response.status(200).json({
        name: userDB.name,
        username: userDB.username,
        token
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = loginRouter
