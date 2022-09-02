const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }
  const tokendecoded = jwt.verify(token, SECRET)

  if (!token || !tokendecoded.id) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }
  const id = tokendecoded.id
  request.userid = id
  next()
}
