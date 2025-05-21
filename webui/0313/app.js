const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);

app.get('/', function (req, res) {
  res.sendfile("main.html");
});

app.get('/test', function (req, res) {
  res.send("Hello World");
});

app.get('/main', function (req, res) {
  res.sendfile("main.html");
});

app.get('/table', function (req, res) {
  res.sendfile("table.html");
});

app.get('/signup', function (req, res) {
  res.sendfile("customPage/signUp.html");
});

app.get('/board', function (req, res) {
  res.sendfile("customPage/board.html");
});

app.get('/resume', function (req, res) {
  res.sendfile("customPage/resume.html");
});
