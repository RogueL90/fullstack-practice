const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl, { family: 4 })
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("unable to connect"))

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = Number(process.env.PORT_NUM)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})