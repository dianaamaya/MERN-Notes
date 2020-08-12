const { Router } = require('express');
const router = Router();

// controllers
const { getNotes, getNote, createNote, updateNote, deleteNote } 
        = require('../controllers/notes.controller');

// route to get all notes or create a new one
router.route('/')
    .get( getNotes )
    .post( createNote );

// route to get/update/delete a note
router.route('/:id')
    .get( getNote )
    .put( updateNote )
    .delete( deleteNote );

module.exports = router;