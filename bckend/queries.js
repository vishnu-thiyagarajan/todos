const redis = require('redis')
const REDIS_PORT = 6379
const { promisify } = require('util')
const client = redis.createClient(REDIS_PORT)
client.on('connect', () => console.log('connected'))
client.on('error', err => console.log('Something went wrong ' + err))
const promisehget = promisify(client.hgetall).bind(client)

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
    res.structuredData = []
    for (const id of data) {
      const data = await promisehget(id)
      if (data === null) res.structuredData.push('null')
      if (typeof data.completed === 'string') data.completed = String(data.completed) === 'true'
      res.structuredData.push(data)
    }
    res.status(200).send(res.structuredData)
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
    res.status(500).send(err)
  }
}

module.exports = {
  createList,
  getList,
  deleteList,
  createTask,
  updateTask,
  deleteTask,
  getTaskData,
  getTask
}
