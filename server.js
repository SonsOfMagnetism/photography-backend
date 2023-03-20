//////////////////
// Dependencies
//////////////////
require("dotenv").config()
const {PORT=3000, DATABASE_URL} = process.env
const express = require("express")
const app = express()
const mongoose  = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

/////////////////////////
// Database Connection
/////////////////////////
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrLParser: true
})

mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error))

////////////
// Schema
////////////
const PhotoSchema = new mongoose.Schema({
  title: String,
  yearTaken: Date,
  location: String,
  tags: String
})

const Photo = mongoose.model("Photo", PhotoSchema)

////////////////
// Middleware
////////////////
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

///////////
// Routes
///////////
// Test Route
app.get("/", (req, res) => {
    res.send("hello world");
  });

//////////////
// Listener
//////////////
app.listen(PORT, () => console.log(`You are now listening to the smooth tunes of Port ${PORT}`))