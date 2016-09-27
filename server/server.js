'use strict';

const express = require('express')
const { json } = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/toDo'
const PORT = process.env.PORT || 3000

// middleware
app.use(express.static('client'))
app.use(json())

// routing
app.get('/api/title', (req, res) => {
  res.json({ title: 'To Do List'})
})

const Task = mongoose.model('task', {
  task: String
})

app.get('/api/tasks', (req, res, err) => {
  Task
    .find()
    .then(tasks => res.json({ tasks }))
    .catch(err)
})

app.post('/api/tasks', (req, res) => {
  const thingToDo = req.body
  Task
    .create(thingToDo)
    .then(thingToDo => res.json(thingToDo))
    .catch(console.error)
})

app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id
  Task
    .remove({ _id: id })
    .then(() => res.json(id))
    .catch(console.error)
})

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
)
