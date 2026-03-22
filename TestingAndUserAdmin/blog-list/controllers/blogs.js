const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = await User.findOne({})
  if (!user) {
    return response.status(400).json({ error: 'no user found' })
  }
  const newBlog = {
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  }
  const blog = new Blog(newBlog)
  
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response) =>{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
    likes: request.body.likes
  }, {
    new: true, 
  })

  if(!updatedBlog){
    response.status(404).end()
  }

  response.json(updatedBlog)
})

module.exports = blogRouter