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

after(async () => {
  await mongoose.connection.close()
})