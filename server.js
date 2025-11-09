const express = require('express')
const db = require('./db')
const app = express()
const studentRouter = require('./router/studentRouter')
require('dotenv').config();
app.use(express.json())

app.use('/student', studentRouter)  //router

const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
    try {
        res.status(200).json({
            message: 'hi this is my first data server',
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log('server started')
})