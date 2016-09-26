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


mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
)
