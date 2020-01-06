const express = require('express')
const redis = require('redis')
const fetch = require('node-fetch')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 8000
const REDIS_PORT = 6379

const client = redis.createClient(REDIS_PORT)
client.on('connect', () => console.log('connected'))
client.on('error', err => console.log('Something went wrong ' + err))
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.post('/addlist/:listid/:listname', createList)
app.get('/getlist', getList)
app.delete('/deletelist/:listid', deleteList)
app.post('/addtask', createTask)
app.put('/updatetask', updateTask)
app.get('/gettaskdata/:id', getTaskData)
app.get('/gettask', getTask)
app.delete('/deletetask/:id', deleteTask)
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
}).timeout = 1000

function createList (req, res, next) {
  try {
    const { listid, listname } = req.params
    client.hset('list', listid, listname)
    res.status(200).send('list created successfully')
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}
function getList (req, res, next) {
  client.hgetall('list', (err, data) => {
    if (err) throw err
    if (data === null) res.send('null')
    if (data !== null) {
      const structuredData = Object.keys(data).map(i => {
        return { id: i, listname: data[i], selected: false, display: true }
      })
      res.send(structuredData)
    }
  })
}
function deleteList (req, res, next) {
  try {
    const { listid } = req.params
    client.hdel('list', listid.split(','))
    res.status(200).send('list deleted successfully')
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

function createTask (req, res, next) {
  try {
    const { id, taskname, notes, priority, duedate, completed, listid } = req.body
    client.rpush('task', id)
    client.hmset(id, 'id', id, 'taskname', taskname, 'notes', notes, 'priority', priority, 'duedate', duedate, 'completed', completed, 'listid', listid)
    res.status(200).send('task created successfully')
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}
function updateTask (req, res, next) {
  try {
    const { id, taskname, notes, priority, duedate, completed, listid } = req.body
    client.hmset(id, 'id', id, 'taskname', taskname, 'notes', notes, 'priority', priority, 'duedate', duedate, 'completed', completed, 'listid', listid)
    res.status(200).send('task updated successfully')
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}
function getTaskData (req, res, next) {
  const { id } = req.params
  client.hgetall(id, (err, data) => {
    if (err) throw err
    if (data === null) res.send('null')
    res.send(data)
  })
}

function getTask (req, res, next) {
  client.lrange('task', 0, -1, async (err, data) => {
    if (err) throw err
    if (data === null) res.send('null')
    const structuredData = []
    for (const id of data) {
      const response = await fetch(`http://localhost:8000/gettaskdata/${id}`)
      const result = await response.json()
      if (typeof result.completed === 'string') result.completed = String(result.completed) === 'true'
      structuredData.push(result)
    }
    res.status(200).send(structuredData)
  })
}

function deleteTask (req, res, next) {
  try {
    const { id } = req.params
    for (const taskid of id.split(',')) {
      client.lrem('task', 1, taskid)
    }
    client.del(id.split(','))
    res.status(200).send('task deleted successfully')
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

app.use((req, res, next) => {
  res.status(404).send('<h1>404 page not found</h1>')
})
