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
app.get('/api/notes', (req, res) => {
    // 
    res.json({
    
    });
  });

// POST so that as user adds notes, it's added to ad.json

// writeFile() note creation

// DELETE uses id to remove at btn click