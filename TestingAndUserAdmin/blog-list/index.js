const express = require('express')
require('dotenv').config()
const blogRouter = require('express').Router()
const Blog = require('./models/blog')
const mongoose = require('mongoose')

const app = express()



const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl, { family: 4 })
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("unable to connect"))

app.use(express.json())

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.use('/api/blogs', blogRouter)


const PORT = Number(process.env.PORT_NUM)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = blogRouter