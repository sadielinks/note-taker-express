// adding npm dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

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

// GET to create and use id's using middleware documentation notes heheh
const 
app.post('/api/notes', (req, res) => {
    dataThatBase.forEach(obj => obj.id = uuid)
});

// POST so that as user adds notes, it's added to ad.json


// app.post('/api/notes', (req, res) => {
//     const notesDB = require('./db/db.json');
    
//     notesDB.forEach(obj => obj.id = uuidv4());
    
//     const newNote = req.body;
//     newNote.id = uuidv4();
//     notesDB.push(newNote);
    
//     fs.writeFile('./db/db.json', JSON.stringify(notesDB), err => {})
    
//     res.json(newNote); 
// })



// writeFile() note creation

// DELETE uses id to remove at btn click