const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validation')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: String,
  url: {
    type: String,
    required: true,
    unique: true
  },
  likes: Number,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
