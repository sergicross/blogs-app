const supertest = require('supertest')
const mongoose = require('mongoose')
const blogs = require('../utils/blogs')
const Blog = require('../models/Blog')
const { app, server } = require('../index')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of blogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('Devuelde los blogs en formato Json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('propiedad de identificador único de las publicaciones del blog se llame id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  expect(blogs[0].id).toBeDefined()
})
test('blog se ha creado correctamente', async () => {
  const newblog = {
    title: 'Go To Create NewBlog',
    author: 'Sergio Garcia',
    url: 'http://localhost:3000',
    likes: 10
  }
  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)
  const response = await api.get('/api/blogs')
  const newblogs = response.body
  expect(newblogs).toHaveLength(blogs.length + 1)
})
test('blog se ha creado sin likes el valor por defecto es 0', async () => {
  const newblog = {
    title: 'Go To Create NewBlog',
    author: 'Sergio Garcia',
    url: 'http://localhost:3000'
  }
  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)
  const response = await api.get('/api/blogs')
  const newblogs = response.body
  const blog = newblogs.find((blog) => blog.title === 'Go To Create NewBlog')
  expect(blog.likes).toBe(0)
})
test('Pasamos un blog sin titulo o sin url expect 400', async () => {
  const newblog = {
    title: '',
    author: 'Sergio Garcia',
    url: '',
    likes: 10
  }
  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(400)
})
test('Delete one item from the blog list', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const blogDelete = blogs[0]
  await api
    .delete(`/api/blogs/${blogDelete.id}`)
    .expect(204)
  const newresponse = await api.get('/api/blogs')
  const newblogs = newresponse.body
  expect(newblogs).toHaveLength(blogs.length - 1)
  expect(newblogs).not.toContain(blogDelete)
})
test('Modificamos los valores de un blog', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const modifyBlog = blogs[0]

  const newblog = {
    title: 'Hola',
    author: 'Sergio Garcia',
    url: 'URL',
    likes: 10
  }
  await api
    .put(`/api/blogs/${modifyBlog.id}`)
    .send(newblog)

  const newresponse = await api.get('/api/blogs')
  const newblogs = newresponse.body
  const newblogstitle = newblogs.map((blog) => {
    return blog.title
  })

  expect(newblogstitle).toContain(newblog.title)
})
afterAll(() => {
  server.close()
  mongoose.connection.close()
})
