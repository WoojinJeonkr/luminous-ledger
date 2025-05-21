const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);

// 문제 1
app.get('/login', function(req, res) {
	res.sendfile("./prob1/login.html");
});

// 문제 1에서 onclick 속성 사용 - 수업내용 X
app.get('/loginOnclick', function(req, res) {
	res.sendfile("./prob1/loginOnclick.html");
});

// jQuery 수업 내용
app.get('/jQueryPractice', function(req, res) {
	res.sendfile("jQueryPractice.html");
});

// 문제 2
app.get('/calc', function(req, res) {
	res.sendfile("./prob2/calcNum.html");
});

// 문제 2 정답
app.get('/calcAns', function(req, res) {
	res.sendfile("./prob2/calcAnswer.html");
});

// for 반복문 수업 내용
app.get('/for', function(req, res) {
	res.sendfile("for.html");
});

// 문제 3
app.get('/forMth1', function(req, res) {
	res.sendfile("./prob3/forMethod1.html");
});

app.get('/forMth2', function(req, res) {
	res.sendfile("./prob3/forMethod2.html");
});

app.get('/forMth3', function(req, res) {
	res.sendfile("./prob3/forMethod3.html");
});

app.get('/forMth4', function(req, res) {
	res.sendfile("./prob3/forMethod4.html");
});

app.get('/forMth5', function(req, res) {
	res.sendfile("./prob3/forMethod5.html");
});

app.get('/forMth6', function(req, res) {
	res.sendfile("./prob3/forMethod6.html");
});

app.get('/forMth7', function(req, res) {
	res.sendfile("./prob3/forMethod7.html");
});

app.get('/forMth8', function(req, res) {
	res.sendfile("./prob3/forMethod8.html");
});

app.get('/star1', function(req, res) {
	res.sendfile("./prob4/star1.html");
});

app.get('/star1Cut', function(req, res) {
	res.sendfile("./prob4/star1_cut_corners.html");
});
