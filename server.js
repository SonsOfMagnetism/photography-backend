//////////////////
// Dependencies
//////////////////
// get .env variables
require("dotenv").config()
// pull PORT from .env and give default value of 3000
const {PORT=3000} = process.env
// import express
const express = require("express")
// create application object
const app = express()

///////////
// Routes
///////////
// Test Route
app.get("/", (req, res) => {
    res.json({
        response: "whaddup tho"
    })
})

//////////////
// Listener
//////////////
app.listen(4000, () => console.log(`You are now listening to the smooth tunes of Port ${PORT}`))