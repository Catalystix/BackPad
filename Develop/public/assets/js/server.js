const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/index', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
    );
    // link to index

    app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
    // link to notes


app.post('/api/reviews', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  
    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
  
    // Log our request to the terminal
    console.info(`${req.method} request received`);
  });
  
  app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
  );