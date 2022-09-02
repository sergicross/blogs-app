require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogController')
const userRouter = require('./controllers/userController')
const loginRouter = require('./controllers/loginController')
const handleError = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testingController')
  app.use('/api/testing', testingRouter)
}

app.use(handleError)
app.use(notFound)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

module.exports = { app, server }
