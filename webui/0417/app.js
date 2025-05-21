const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);

app.get('/', function (req, res) {
  res.send("res");
});

app.get('/array', function (req, res) {
  res.sendfile("./html/array.html");
});

app.get('/radio', function (req, res) {
  res.sendfile("./html/findRadio.html");
});

app.get('/prob1', function (req, res) {
  res.sendfile("./practice/prob1.html");
});

app.get('/prob2', function (req, res) {
  res.sendfile("./practice/prob2.html");
});
