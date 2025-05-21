---
제목: HTML 폼 요소 실습
작성일: 2025-03-13
---

## 1. Express.js 서버 구현

### 1) 서버 설정

```javascript
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);
```

### 2) 라우팅 설정

```javascript
// 기본 페이지
app.get('/', function (req, res) {
    res.sendfile("main.html");
});

// 테스트 페이지
app.get('/test', function (req, res) {
    res.send("Hello World");
});

// 다른 페이지들
app.get('/main', function (req, res) {
    res.sendfile("main.html");
});

app.get('/table', function (req, res) {
    res.sendfile("table.html");
});

// 사용자 정의 페이지들
app.get('/signup', function (req, res) {
    res.sendfile("customPage/signUp.html");
});

app.get('/board', function (req, res) {
    res.sendfile("customPage/board.html");
});

app.get('/resume', function (req, res) {
    res.sendfile("customPage/resume.html");
});
```

## 2. HTML 폼 요소 실습

### 1) 텍스트 입력 필드

```html
<!-- 기본 텍스트 입력 -->
<input type="text" name="" value="검색" placeholder="검색어를 입력하세요.">

<!-- 비밀번호 입력 -->
<input type="password" placeholder="비밀번호를 입력하세요">
```

### 2) 버튼

```html
<input type="button" name="loginBtn" value="로그인">
```

### 3) 라디오 버튼

```html
<!-- 성별 선택 -->
남성<input type="radio" name="gender" checked>
여성<input type="radio" name="gender">
기타<input type="radio" name="gender">

<!-- 국적 선택 -->
내국인<input type="radio" name="nationality">
외국인<input type="radio" name="nationality">
외계인<input type="radio" name="nationality">
```

### 4) 드롭다운 메뉴

```html
<!-- 월 선택 드롭다운 -->
<select>
    <option>1월</option>
    <option>2월</option>
    <option>3월</option>
    <!-- ... 나머지 월들 -->
</select>
```

## 3. 테이블 구현

```html
<!-- 기본 테이블 구조 -->
<table>
    <tr> <!-- table row: 테이블 행 -->
        <td></td> <!-- table data: 테이블 열 -->
        <td></td>
    </tr>
</table>
```

## 4. 주요 특징

- Express.js를 사용한 간단한 웹 서버 구현
- HTML 폼 요소 실습 (input, button, radio, select)
- 테이블 구조 학습
- 라우팅 구현 및 파일 서빙

## 5. 참고사항

- 모든 HTML 파일들은 UTF-8 인코딩을 사용
- 라디오 버튼의 **name** 속성이 같은 그룹은 한 번에 하나만 선택 가능
- **placeholder** 속성을 사용하여 입력 필드에 힌트 텍스트 표시 가능
- 테이블의 **width**와 **height** 속성을 사용하여 크기 조절 가능
