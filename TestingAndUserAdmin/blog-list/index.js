const app = require('./app')

const PORT = Number(process.env.PORT_NUM)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})