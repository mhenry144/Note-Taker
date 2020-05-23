const express = require("express");
const fs = require("fs");
const path = require("path");
var port = normalizePort(process.env.PORT || '3000');

var app = express();


// connection to express server using our port number
app.listen(app.get('port'));
