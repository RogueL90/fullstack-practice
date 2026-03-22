const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()


const mongoUrl = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGO_URI
mongoose.connect(mongoUrl, { family: 4 })
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("unable to connect"))

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app