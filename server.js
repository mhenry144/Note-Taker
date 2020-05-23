const express = require("express");
const fs = require("fs");
const path = require("path");
var port = normalizePort(process.env.PORT || "3000");

var app = express();

// start the server at localhost:3000
app.listen(app.get("port"));
console.log("Server started! At http://localhost:" + port);
