const express = require('express')
const db = require('./queries')
const router = express.Router()

router.post('/addlist/:listid/:listname', db.createList)
router.get('/getlist', db.getList)
router.delete('/deletelist/:listid', db.deleteList)
router.post('/addtask', db.createTask)
router.put('/updatetask', db.updateTask)
router.get('/gettaskdata/:id', db.getTaskData)
router.get('/gettask', db.getTask)
router.delete('/deletetask/:id', db.deleteTask)

module.exports = router
