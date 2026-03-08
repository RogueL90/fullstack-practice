const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Noland's Journey",
    author: "Imu",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    title: "Joyboy Story",
    author: "Imu",
    url: "https://reactpatterns.com/",
    likes: 14,
    __v: 0
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willdeletesoon'})
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}