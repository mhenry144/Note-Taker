const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 3000;

const server = express();

const directory = path.join(__dirname, "/public");

// configure static files with express

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, "/public")));

// fetch front-end

server.get("/notes", function (req, res) {
  res.sendFile(path.join(directory, "notes.html"));
});

server.get("/api/notes", function (req, res) {
  res.sendFile(path.join(directory, "../db/db.json"));
});

server.get("/api/notes/:id", function (req, res) {
  let userNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
  res.json(userNotes[Number(req.params.id)]);
});

server.get("*", function (req, res) {
  res.sendFile(path.join(directory, "index.html"));
});

// post function

server.post("/api/notes", function (req, res) {
  let userNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let updatedNotes = req.body;
  let userID = userNotes.length.toString();
  updatedNotes.id = userID;
  userNotes.push(updatedNotes);

  fs.writeFileSync("./db/db.json", JSON.stringify(userNotes));
  console.log("Note saved!", updatedNotes);
  res.json(userNotes);
});

// delete function

server.delete("/api/notes/:id", function (req, res) {
  let userNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  console.log(` note ID: ${noteID} Deleted!`);
  userNotes = userNotes.filter((currNote) => {
    return currNote.id != noteID;
  });

  for (currNote of userNotes) {
    currNote.id = newID.toString();
    newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(userNotes));
  res.json(userNotes);
});

// start the server at localhost:3000

server.listen(port);
console.log("Server started! At http://localhost:" + port);
