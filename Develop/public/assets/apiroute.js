const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('./helperutil');
const { v4: uuidv4 } = require('./uuid');
const fs = require('fs');

// JSON the data
router.get('/', (req, res) => {
    readFromFile('./dev/db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for new notes
router.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './dev/db/db.json');
        res.json('Note added');
    } else {
        res.error('Error in adding');
    }
});



// /api/notes/:id receives a query parameter containing the id of a note to delete. 
// UUID has assigned them a unique id, so this finds that id and splices the note, then rewrites the db.json. 
router.delete('/:id', (req, res) => {
    const {id} = req.params
    const note = JSON.parse(fs.readFileSync("./dev/db/db.json", "utf8"));

    const index = note.findIndex((note) => note.note_id === id);
    note.splice(index, 1);
    writeToFile("./dev/db/db.json", note);
  
    return res.send();
  });




module.exports = router;