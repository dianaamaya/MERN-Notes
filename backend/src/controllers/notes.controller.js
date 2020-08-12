const notesCtrl = {};

//models
const NoteModel = require('../models/Note');

/**
 * get all notes
 * @return {Object} notes - all notes from the database
 */
notesCtrl.getNotes = async (req, res) => {
    const notes = await NoteModel.find();
    res.json(notes)

}

/**
 * get a note from the database
 * @param {String} id - identificator of the required note
 * @return {Object} note - found note 
 */
notesCtrl.getNote = async (req, res) => {
    const note = await NoteModel.findById(req.params.id);    
    res.json(note);
}

/**
 * create a note 
 * @param {String} title - note title
 * @param {String} content - description note
 * @param {String} author - who created the note
 * @param {String} date - when note was created
 * @return {Object} message - confirmation of the note creation 
 */
notesCtrl.createNote = async (req, res) => {
    const { title, content, author, date } = req.body; 
    const newNote = new NoteModel({
        title, 
        content, 
        author, 
        date
    });
    await newNote.save();
    res.json({message: "note created"});
}

/**
 * update a note 
 * @param {String} title - note title
 * @param {String} content - description note
 * @param {String} author - who created the note
 * @param {String} date - when note was updated
 * @return {Object} message - confirmation of the note update 
 */
notesCtrl.updateNote = async (req, res) => {
    const { title, content, author, date } = req.body;
    await NoteModel.findByIdAndUpdate(req.params.id, {
        title, 
        content,
        author,
        date
    });
    res.json({message: "note updated"});
}

/**
 * delete a note from the database
 * @param {String} id - identificator of the note
 * @return {Object} message - confirm note was deleted
 */
notesCtrl.deleteNote = async (req, res) => {
    await NoteModel.findByIdAndDelete(req.params.id);
    res.json({message: "note deleted"});
}

module.exports = notesCtrl;