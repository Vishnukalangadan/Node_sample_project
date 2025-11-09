const mongoose = require("mongoose")

const MONGODB_URL = 'mongodb://localhost:27017/blog'
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('connected', () => {
    console.log("connected succesfully")
})
db.on('disconnected', () => {
    console.log("disconnected succesfully")
})
db.on('error', () => {
    console.log("error occured")
})


module.exports = {
    db
}
