const mongoose = require('mongoose')
const { NODE_ENV, MONGO_DB_URI, MONGO_DB_URI_TEST } = process.env

const conectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

mongoose.connect(conectionString).then(() => {
  console.log('Database Connected')
}).catch(err => {
  console.error(err)
})

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
