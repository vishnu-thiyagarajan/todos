const express = require('express')
const routes = require('./admin')
const cors = require('cors')
// const bodyParser = require('body-parser')
const PORT = 8000

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})

app.use((req, res, next) => {
  res.status(404).send('<h1>404 page not found</h1>')
})
