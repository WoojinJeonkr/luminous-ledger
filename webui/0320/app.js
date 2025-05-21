const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);

app.get('/csstag', function(req, res) {
  res.sendfile("cssTag.html");
});

app.get('/', function(req, res) {
	res.sendfile("jsCheck.html");
});

app.get('/js', function(req, res) {
  res.sendfile("js.html");
});

app.get('/probOne', function(req, res) {
  res.sendfile("probOne.html");
});

app.get('/forjs', function(req, res) {
  res.sendfile("forJS.html");
});
