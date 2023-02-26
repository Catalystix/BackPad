const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const routes = require('./apiroute');
const note = require('./htmlroute');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/notes', routes);
app.use('/notes', note);


// app.get('/index', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'))
// });
// link to index

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// link to notes


// app.post('/api/notes', (req, res) => {
//     // Let the client know that their POST request was received
//     res.json(`${req.method} request received`);

//     // Show the user agent information in the terminal
//     console.info(req.rawHeaders);

//     // Log our request to the terminal
//     console.info(`${req.method} request received`);
//   });

// made helper function for this
//   app.delete('/api/notes/:id',(req, res) => {

//   });

// * is the default path, even if others fail

app.listen(PORT, () => {
    console.log(`Server up & running @ http://localhost:${PORT}`);
});

  // node server.js
