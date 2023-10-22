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

// Import Cookie Parser
const cookieParser = require('cookie-parser')

// Import NoteController
const notesController = require('./controllers/notesController');
const userController = require('./controllers/usersController');

const requireAuth = require('./middleware/requireAuth')



// Create an express app
const app = express();


// Configure express app
app.use(express.json()); 
app.use(cookieParser())

// Configure Cors
app.use(cors({
    origin: true,
    credentials: true,
}))

// Connect to DB
conncectToDb();

//Routing
app.get("/", (req, res)=>{
    res.json({hello: "world"})
});

app.post("/signup", userController.signup);

app.post("/login", userController.login);

app.get("/logout", userController.logout);

app.get("/check-auth", requireAuth, userController.checkAuth);

// Fetch all notes
app.get("/notes", requireAuth, notesController.fetchNotes);

// Fetch single note
app.get("/notes/:id", requireAuth, notesController.fetchNote);

// Create one note
app.post("/notes", requireAuth, notesController.createNote);

// Update 
app.put("/notes/:id", requireAuth, notesController.updateNote);

// Delete
app.delete("/notes/:id", requireAuth, notesController.deleteNote);

//Start Our Server
app.listen(process.env.PORT);