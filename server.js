// adding npm dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

// express items
const app = express();
const PORT = process.env.PORT || 3001;

// express app set-up for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware for public/assets contents
app.use(express.static('public'));

// GET request for root (main html) + notes (notes html) routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

// GET connection to db.json spec. with notes
const dataThatBase = require('./db/db.json');
app.get('/api/notes', (req, res) => {
    // grabbing db.json
    res.json(dataThatBase);
  });

// to create and use id's using npm documentation (https://www.npmjs.com/package/uuid) heheh
const { v4: uuidv4 } = require('uuid');
app.post('/api/notes', (req, res) => {
    dataThatBase.forEach(obj => obj.id = uuid());
    // assign variable for writeFile
    const writeThatNote = req.body;
    writeThatNote.id = uuidv4();
    dataThatBase.push(writeThatNote);
    // make writeFile() + using db.json
    fs.writeFile('./db/db.json', JSON.stringify(writeThatNote), err => {})
    console.log('did this work yet?')
    // call it!
    res.json(writeThatNote); 
});

// DELETE uses id to remove, worked with TA - will delete + edit notes thru this larger function
app.delete('/api/notes/:id', function (req, res){
  let dataThatBase = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  // assign variable for finding thru ID
  let notesID = req.params.id;
  // new notes to db.json
  newNoteData = dataThatBase.filter((myNoteNow) => {
    return myNoteNow.id != notesID;
  })
  
});






//
  // LISTEN has the server connected
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - YAY!`);
});