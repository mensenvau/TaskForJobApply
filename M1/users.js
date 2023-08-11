const express = require("express");
const RandomValue = require("./function/random");
const app = express()


// get all users
app.get("/users", async (req, res, next) => {
    try {
        let { sendToQueue } = require("./function/connection");
        let uid = req.params.id;
        let rid = RandomValue();

        eventEmitter.once(`users-all-${rid}`, data => {
            res.json(data);
        });

        sendToQueue("users-all", Buffer.from(JSON.stringify({ uid, emitId: `users-all-${rid}` })));
    } catch (err) {
        next(err)
    }
})


// get users with id
app.get("/user-info/:id", async (req, res, next) => {
    try {
        let { sendToQueue } = require("./function/connection");

        let uid = req.params.id;
        let rid = RandomValue();

        eventEmitter.once(`user-info-${rid}`, data => {
            res.json(data);
        });

        sendToQueue("user-info", Buffer.from(JSON.stringify({ uid, emitId: `user-info-${rid}` })));
    } catch (err) {
        next(err)
    }
})

module.exports = app; 