const express = require("express");
const app = express()

require("dotenv").config();

// Test Router!
app.get("/test", (req, res, next) => {
    res.send("hi")
})

app.listen(process.env.PORT, () => {
    console.log(`M1 server started working with http://127.0.0.1: ${process.env.PORT}`)
})