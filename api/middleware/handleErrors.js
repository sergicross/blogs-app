module.exports = (error, request, response, next) => {
  console.log(error.name)

  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'id used is malformed'
    })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError') {
    response.status(400).json({ error: 'Nombre duplicado' })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'token missing or invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    response.status(401).json({ error: 'token expired' })
  } else {
    response.status(500).end()
  }
}
