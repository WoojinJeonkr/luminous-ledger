// npm: node package manager
// npm install express 과정을 거쳤기에 가져올 수 있었음
// Express와 http 모듈을 불러옵니다
const express = require('express');
const http = require('http');
// Express 애플리케이션을 생성합니다.
const app = express();

// 클라이언트: 서버에 요청을 보냄, 서버에서 응답을 받음
// 서버: 클라이언트에서 요청이 들어오면 응답을 클라이언트에 보내줌
// app: express 애플리케이션 인스턴스
// app을 app2로 이름을 변경하면 밑에 app도 app2로 변경해주면 됨
// 기본 port) http: 80, https: 443
// HTTP 서버를 생성하고 80번 포트에서 실행합니다.
const server = http.createServer(app).listen(80);

// 의미: '/test'라는 요청을 보내면 응답으로 "hello world"를 보내라
// '/test' 경로에 대한 GET 요청 핸들러를 정의합니다.
app.get('/test', function (req, res) {
  // 클라이언트에 "hello world" 문자열을 응답으로 보냅니다.
  res.send("hello world");
  // '/test' 요청이 들어올 때마다 출력
  // console.log("backend");
});

// 의미: '/test2'라는 요청이 들어오면 "hello world2"라는 응답을 보냄
app.get('/test2', function (req, res) {
  res.send("hello world2");
});

app.get('/test3', function(request, response) {
  response.send("hello world3");
});

app.get('/main', function(req, res) {
  res.sendfile("main.html");
});

app.get('/', function (req, res) {
  res.sendfile("main.html");
});


// 서버 실행 시 한 번만 출력
console.log("backend");

// alert가 없기에 실행하면 오류가 나온다
// alert("hello");
