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
// Test
app.get("/", (req, res) => {
    res.send("hello world");
});

// Index
app.get("/photo", async (req,res) => {
  try {
    res.json(await Photo.find({}))
  } catch (error) {
    res.status(400).json(error)
  }
})

// Create
app.post("/photo", async (req, res) => {
  try {
    res.json(await Photo.create(req.body))
  } catch (error) {
    res.status(400).json(error)
  }
})

// Update
app.put("/photo/:id", async (req, res) => {
  try {
    res.json(await Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}))
  } catch (error) {
    res.status(400).json(error)
  }
})

// Delete
app.delete("/photo/:id", async (req, res) => {
  try {
    res.json(await Photo.findByIdAndRemove(req.params.id))
  } catch (error) {
    res.status(400).json(error)
  }
})

// Show

//////////////
// Listener
//////////////
app.listen(PORT, () => console.log(`You are now listening to the smooth tunes of Port ${PORT}`))