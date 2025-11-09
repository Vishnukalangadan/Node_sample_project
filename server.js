const express = require('express')
const db = require('./db')
const app = express()
const Movie = require('./models/Movie')
const studentRouter = require('./router/studentRouter')
app.use(express.json())

app.use('/student', studentRouter)
app.get('/', async (req, res) => {
    try {
        const movieData = await Movie.find({})
        res.status(200).json({
            message: 'hi this is my first data server',
            data: movieData
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post("/movieadded", async (req, res) => {
    try {
        const data = req.body
        const newMovie = new Movie(data)
        const response = await newMovie.save()
        res.status(201).json({
            message: "movie saved",
            data: response
        })
    } catch (err) {
        console.log(err)
    }
})

app.listen(3000, () => {
    console.log('server started')
})