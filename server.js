// adding npm dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

// express items
const app = express();
const PORT = process.env.PORT || 3001;

// express app set-up for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware for public/assets contents
app.use(express.static("public"));

// GET request for root (main html) + notes (notes html) routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET connection to db.json spec. with notes
const dataThatBase = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
app.get("/api/notes", (req, res) => {
  // grabbing db.json
  res.json(dataThatBase);
});

// POST to add in user notes
const { v4: uuidv4 } = require("uuid");
app.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();
  dataThatBase.push(req.body);
  // make writeFile() + using db.json
  fs.writeFile("./db/db.json", JSON.stringify(dataThatBase), function () {
    // console.log('did this work yet?!')
  });
  // call it!
  res.json(true);
});

// to create and use id's using npm documentation (https://www.npmjs.com/package/uuid) heheh
app.get("/api/notes/:id", (req, res) => {
  res.json(dataThatBase[Number(req.params.id)]);
});

// DELETE uses id to remove, worked with TA - will delete + edit notes thru this larger function
app.delete("/api/notes/:id", (req, res) => {
  let byeToThisID = req.params.id;
  // sort thru db.json for ID
  for (var i = 0; i < dataThatBase.length; i++) {
    const note = dataThatBase[i];
    if (note) {
      if (note.id == byeToThisID) {
        dataThatBase.splice(i, 1);
      }
    }
  }
  // looping through to have the notes display in new order, after others have been deleted
  for (var i = 1; i < dataThatBase.length; i++) {
    const note = dataThatBase[i];
    if (note) {
      note.id = i;
    }
  }
  // have db.json re-arranged as well
  fs.writeFileSync("./db/db.json", JSON.stringify(dataThatBase));
  res.end();
});

// LISTEN has the server connected
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - YAY!`);
});
