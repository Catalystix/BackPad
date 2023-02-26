const notes = require('express').Router();
const path = require('path');

// Path to get the notes HTML file
notes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

module.exports = notes;