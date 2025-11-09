const mongoose = require("mongoose")
require('dotenv').config()
const MONGODB_URL = process.env.MONGODB_URL_ATLAS
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
