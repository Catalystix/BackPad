const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('./helperutil');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// JSON the data
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for notes
router.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added');
    } else {
        res.error('Error in adding');
    }
});



// /api/notes/:id receives a query parameter containing the id of a note to delete. 
// UUID has assigned them a unique id, so this finds that id and splices the note, then rewrites
router.delete('/:id', (req, res) => {
    const {id} = req.params
    const note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const index = note.findIndex((note) => note.id === id);
    note.splice(index, 1);
    writeToFile("./db/db.json", note);
  
    return res.send();
  });




module.exports = router;