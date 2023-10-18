// Controlers is place make function with sintax express

const Note = require("../models/note")

const fetchNotes = async (req, res) => {
    // Find the Note
    const notes = await Note.find();
    // Respon with it
    res.json({notes})
}

const fetchNote =  async (req, res) => {
    // Get id of the URl
    const noteId = req.params.id
    // Find note using that id
    const note = await Note.findById(noteId)

    // Respon with the note
    res.json({note}) 
}

const createNote = async (req, res) => {
    //Get the sent in data of the request body
    const{title, body} = req.body
    // const title = req.body.title;
    // const body = req.body.body;

    //Create a note with it
    const note =  await Note.create({
        title,
        body,
        // title: title,
        // body: body,
    });

    //Respond with the new note
    res.json({note})  
}

const updateNote = async (req, res) => {
    //get the id of the url
    const noteId = req.params.id;

    //get data off the req body
    const{title, body} = req.body
    // const title = req.body.title;
    // const body = req.body.body;

    //find and update the record
    await Note.findByIdAndUpdate(noteId, {
        title, body,
        // title: title,
        // body: body
    })

    const note = await Note.findById(noteId);

    //respon with it
    res.json({note: note});
}

const deleteNote = async (req, res) => {

    const noteId = req.params._id;

    // Delete The Record
    await Note.deleteOne({id: noteId})

    //Respond with the new note
    res.json({success: "Record Deleted"})
}

module.exports = {
    fetchNote,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    // fetchNotes: fetchNotes,
    // fetchNote: fetchNote,
    // createNote: createNote,
    // updateNote: updateNote,
    // deleteNote: deleteNote

}