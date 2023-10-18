// Load Env Variables
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

// Import Depedencies
// Import Express Dependecies
const express = require('express');
// Import for Connect to config/conncectToDb.js
const conncectToDb = require('./config/connectToDb');
// Import models/note.js

// Import Cors
const cors = require('cors')

// Import NoteController
const notesController = require('./controllers/notesController');



// Create an express app
const app = express();

// Configure express app
app.use(express.json()); 

// Configure Cors
app.use(cors())

// Connect to DB
conncectToDb();

//Routing
app.get("/", (req, res)=>{
    res.json({hello: "world"})
});


// Fetch all notes
app.get("/notes", notesController.fetchNotes);

// Fetch single note
app.get("/notes/:id", notesController.fetchNote)

// Create one note
app.post("/notes", notesController.createNote)

// Update 
app.put("/notes/:id", notesController.updateNote)

// Delete
app.delete("/notes/:id", notesController.deleteNote)

//Start Our Server
app.listen(process.env.PORT);