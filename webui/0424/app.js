const { log } = require('console');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);

app.get('/', function (req, res) {
  res.send("res");
});

app.get('/radio', function (req, res) {
  res.sendfile("./radio.html");
});

app.get('/score', function (req, res) {
  res.sendfile("./scoreWeight.html");
});

app.get('/ansScore', function (req, res) {
  res.sendfile("./ansScoreWeight.html");
});

app.get('/home', function (req, res) {
  res.sendfile("./home.html");
});

app.get('/qsPractice', function (req, res) {
  console.log(req.query.key4);
  res.send("qsp");
});

app.get('/qs', function (req, res) {
  res.send(`쿼리스트링 q의 값은 ${req.query.q}입니다.`);
});

app.get('/add', function (req, res) {
  let num1 = Number(req.query.num1);
  let num2 = Number(req.query.num2);
  res.send(`${num1}과 ${num2}의 합은 ${num1 + num2}입니다.`);
});