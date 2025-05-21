---
제목: Node.js Express 서버 기본 설정 및 요청 처리
작성일: 2025-03-06
---

## 1. 서버 설정

### 1) 필요한 모듈 설치

```bash
npm install express
```

### 2) 기본 서버 설정

```javascript
// Express와 http 모듈을 불러옵니다
const express = require('express');
const http = require('http');

// Express 애플리케이션을 생성합니다
const app = express();

// HTTP 서버를 생성하고 80번 포트에서 실행합니다
const server = http.createServer(app).listen(80);
```

## 2. 요청 처리

### 1) 기본 GET 요청 처리

```javascript
// '/test' 경로에 대한 GET 요청 핸들러를 정의합니다
app.get('/test', function (req, res) {
    res.send("hello world");
});
```

### 2) 다중 경로 설정

```javascript
// '/test2' 경로에 대한 GET 요청
app.get('/test2', function (req, res) {
    res.send("hello world2");
});

// '/test3' 경로에 대한 GET 요청
app.get('/test3', function(request, response) {
    response.send("hello world3");
});
```

### 3) HTML 파일 응답

```javascript
app.get('/main', function(req, res) {
    res.sendfile("main.html");
});

// 루트 경로('/')에 대한 요청도 main.html을 보여줍니다
app.get('/', function (req, res) {
    res.sendfile("main.html");
});
```

## 3. 클라이언트와 서버의 관계

- 클라이언트: 서버에 요청을 보냄, 서버에서 응답을 받음
- 서버: 클라이언트에서 요청이 들어오면 응답을 클라이언트에 보내줌

## 4. 기본 포트 번호

- HTTP: 80번 포트
- HTTPS: 443번 포트

## 5. 주의사항

- Express 애플리케이션 인스턴스의 이름을 변경하면 해당 이름으로 일관성 있게 사용해야 함
- **res.sendfile()**은 Express 4.x 이후 버전에서는 **res.sendFile()**으로 변경됨
- 클라이언트 측 JavaScript는 서버 측 JavaScript와 독립적으로 실행됨
