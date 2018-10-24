import express from 'express'
import bodyParser from 'body-parser'
import dotEnv from 'dotenv'
import store from './controllers/store'
import mongoose from 'mongoose'
const PORT = process.env.PORT || 3001;

dotEnv.config();
const app = express()
const router = express.Router()

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

app.use(bodyParser.json());
app.use('/', router)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // connected
    console.log('connected')
})

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
})

router.post('/store', store.create)

router.use((req, res, next) => {
    if (res.locals.data) {
        let response = Object.assign({}, res.locals.data, {
            'status': 'ok'
        })
        return res.status(200).json(response)
    } else if (res.locals.error) { // Any errors thrown are be handled below, but because we're bad not all errors are thrown >:(
        let statusCode = res.locals.error.code || 500
        let response = Object.assign({}, res.locals.error, {
            'status': 'error'
        })
        return res.status(statusCode).json(response)
    } else {
        return res.status(500).json({
            'status': 'error',
            'code': 500,
            'msg': 'Internal Server Error'
        })
    }
})
