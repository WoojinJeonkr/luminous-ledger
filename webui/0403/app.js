const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);

app.get('/', function (req, res) {
  res.send("res");
});

app.get('/for', function (req, res) {
	res.sendfile("for.html");
});

app.get('/for2', function (req, res) {
	res.sendfile("for2.html");
});

app.get('/for3', function (req, res) {
	res.sendfile("for3.html");
});

app.get('/gugu', function (req, res) {
	res.sendfile("gugu.html");
});

app.get('/gugu2', function (req, res) {
	res.sendfile("gugu2.html");
});

app.get('/printStar1', function (req, res) {
  res.sendfile("./star/printLTriStar.html");
});

app.get('/printStar2', function (req, res) {
  res.sendfile("./star/printRTriSTar.html");
});

app.get('/printStar3', function (req, res) {
  res.sendfile("./star/printEqTriStar.html");
});

app.get('/printStar4', function (req, res) {
  res.sendfile("./star/printRevTriStar.html");
});

app.get('/printStar5', function (req, res) {
  res.sendfile("./star/printRhombus.html");
});
