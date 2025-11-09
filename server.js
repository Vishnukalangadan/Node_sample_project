const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { link } = require("fs")


const app = express()
const MONGODB_URL = "mongodb://localhost:27017/"
const corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions))
mongoose.connect(MONGODB_URL + "blog").then(() => {
    console.log("mongodb connected successfully")
})

const postSchema = new mongoose.Schema({
    name: String,
    place: String,
})

const movieSchema = new mongoose.Schema({
    title: String,
    content: String
})
const studentSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
})



const Post = mongoose.model("post", postSchema)
const Movie = mongoose.model("Movie", movieSchema)
const Student = mongoose.model("Student", studentSchma)


const port = 3000

app.get('/', async (req, res) => {
    try {
        // const posts = await Post.find({})
        res.json({
            message: "this is a sample backend",
            data: await Student.aggregate([
                { $match: { age: { $gt: 25 } } }
            ]),

        })
    } catch (err) {
        res.status(500).json({ message: "failed to fetch posts" })
    }
})

app.post('/movieAdded', async (req, res) => {
    console.log("Movie added")
    await Movie.create({
        title: "Iyobinte Pusthakam",
        content: "https://www.youtube.com/watch?v=qTAiwIPvYSA"
    })
    res.json({ message: "Movie added successfully" })
})
app.post('/studentDetailsAdded', async (req, res) => {
    await Student.insertMany([
        { name: "Vishnu", age: 27, city: "Kochi", skills: ["React", "Node.js"], marks: 85 },
        { name: "Rahul", age: 24, city: "Kochi", skills: ["React"], marks: 72 },
        { name: "Asha", age: 26, city: "Chennai", skills: ["Node.js", "Express"], marks: 90 },
        { name: "Meera", age: 23, city: "Bangalore", skills: ["React", "MongoDB"], marks: 60 },
        { name: "Arjun", age: 27, city: "Chennai", skills: ["React", "Node.js", "MongoDB"], marks: 95 },
        { name: "Sneha", age: 21, city: "Kochi", skills: ["Express"], marks: 55 },
        { name: "Vivek", age: 28, city: "Bangalore", skills: ["Node.js", "MongoDB"], marks: 88 }
    ])
    res.json({
        message: "STUDENT Data added successfully",

    })

})
app.post('/insertMovies', async (req, res) => {
    console.log("Movie inserted")
    await Movie.insertOne({
        title: "Hero",
        content: "https://www.youtube.com/watch?v=z3h769ZHGO8"
    })
    res.json({ message: "Movie added successfully" })
})

const Employee = mongoose.model("Employee", {
    name: String,
    salary: Number,
    city: String
});
app.post("/add", async (req, res) => {
    try {
        const result = await Employee.create({
            name: "Vishnu",
            salary: 50000,
            city: "Kochi"
        })
        res.send("added successfully", result)
    }
    catch (err) {
        res.status(500).json({ message: "failed to post" })
    }
})

app.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id
        await Employee.updateOne({ _id: id }, { $set: { salary: 60000 } })
        res.send("updated successfully")
    }
    catch (err) {
        res.status(500).json({ message: "failed to update" })
    }
})
app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        await Employee.deleteOne({ _id: id })
        res.send("deleated successfully")
    }
    catch (err) {
        res.status(500).json({ message: "failed to delete" })
    }
})
app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.json({ data: employees })
    }
    catch (err) {
        res.status(500).json({ message: "failed to fetch employee data" })
    }
})
    

app.listen(port, () => {
    console.log("server running.....")
})