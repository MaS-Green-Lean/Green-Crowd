import express from 'express'
import bodyParser from 'body-parser'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'
import Store from './models/store'
import Produce from './models/store'
import api from './routes'
const PORT = process.env.PORT || 3001

dotEnv.config()
const app = express()

mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true })

const db = mongoose.connection

app.use(bodyParser.json())
app.use('/api', api)
db.on('error', console.error.bind(console, 'connection error:'))

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
})
