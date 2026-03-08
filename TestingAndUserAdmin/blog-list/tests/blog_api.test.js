const { test, after , beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('GET request returns json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('GET request returns correct # of posts', async () => {
    const res = await api
    .get('/api/blogs')
    assert.strictEqual(res.body.length, helper.initialBlogs.length)
})

test('id named correctly in DB', async () => {
    const res = await api.get('/api/blogs')
    const blogs = res.body
    assert(Object.hasOwn(blogs[0], 'id'))
})

test('blog is added correctly', async () => {
    const newBlog = {
    title: "One Piece",
    author: "Eichiro D Oda",
    url: "https://reactpatterns.com/",
    likes: 67,
  }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()
    const titles = finalBlogs.map(blog => blog.title)

    assert.strictEqual(helper.initialBlogs.length+1, finalBlogs.length)
    assert(titles.includes('One Piece'))

})

test('likes default to 0', async () => {
    const newBlog = {
    title: "One Piece",
    author: "Eichiro D Oda",
    url: "https://reactpatterns.com/"
  }

  const response = await api.post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('deletion removes correct document', async () => {
    const blogsBefore = await helper.blogsInDb()
    await api.delete(`/api/blogs/${blogsBefore[0].id}`)
    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(helper.initialBlogs.length, blogsAfter.length+1)
    const search = blogsAfter.filter(blog => blog.id === blogsBefore[0].id)
    assert.strictEqual(search.length, 0)
})

test('updating works', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogAfter = await api.put(`/api/blogs/${blogsBefore[0].id}`)
    .send({likes: blogsBefore[0].likes+10})
    .expect(200)

    assert.strictEqual(helper.initialBlogs[0].likes+10, blogAfter.body.likes)
})

after(async () => {
  await mongoose.connection.close()
})