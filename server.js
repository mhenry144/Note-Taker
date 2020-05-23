var express = require("express");
const fs = require("fs");
const path = require("path");
var port = normalizePort(process.env.PORT || "3000");

var server = express();

const directory = path.join(__dirname, "/public");

// configure static files with express

server.configure(function () {
  server.use(express.static(__dirname + "/public"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
});

// fetch front-end

server.get("*", function (req, res) {
  res.sendFile(path.join(directory, "index.html"));
});

server.get("/notes", function (req, res) {
  res.sendFile(path.join(directory, "notes.html"));
});

server.get("/api/notes", function (req, res) {
  res.sendFile(path.join(directory, "/db/db.json"));
});

server.get("/api/notes/:id", function (req, res) {
  let userNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(userNotes[Number(req.params.id)]);
});

// express post

server.post("/api/notes", function (req, res) {
  let userNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let updatedNotes = req.body;
  let userID = userNotes.length.toString();
  updatedNotes.id = userID;
  userNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(userNotes));
  console.log("Note saved!", updatedNotes);
  res.json(userNotes);
});
// start the server at localhost:3000

server.listen(server.get("port"));
console.log("Server started! At http://localhost:" + port);
