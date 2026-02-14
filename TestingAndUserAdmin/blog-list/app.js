const blogRouter = require('./controllers/blogs')
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()


const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl, { family: 4 })
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("unable to connect"))

app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app