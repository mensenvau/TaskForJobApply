const express = require("express");
const connectQueue = require("./function/connection");
const app = express()

const EventEmitter = require('events');
const { start } = require("./function/connection");

global.eventEmitter = new EventEmitter();

require("dotenv").config()
app.use(express.json());

//router!
app.use("/", require("./users"))

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "not found this router!" })
})

app.use("*", (err, req, res, next) => {
    res.status(404).json({ message: "not working server!", error: err })
})

start().then(() => {
    app.listen(process.env.M1_PORT, () => {
        console.log(`M1 server started working with http://127.0.0.1:${process.env.M1_PORT}`)
    })
}).catch((error) => {
    console.log("M1 server con't working!, About: " + error.message)
})
