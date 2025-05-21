---
제목: JavaScript 기본 문법과 이벤트 학습
작성일: 2025-03-20
---

## 1. CSS 선택자와 우선순위

### 1) CSS 선택자 종류

```html
<style>
  /* 1. 태그 선택자 */
  li {
    color: red;
    font-size: 1.5rem;
  }
  
  /* 2. class 선택자 */
  .greenLi {
    color: green;
    font-size: 2.9rem;
  }
  
  /* 3. id 선택자 */
  #blueLi {
    color: blue;
    font-size: 1.0rem;
  }
</style>
```

### 2) 우선순위 규칙

- id 선택자 > class 선택자 > 태그 선택자
- 중복된 id는 피해야 함

## 2. JavaScript 기본 문법

### 1) 변수와 타입 변환

```javascript
let a = 10;        // 숫자
a = "string";      // 문자열
a = [1,2,3];      // 배열

// 타입 변환 예시
let b = 10;
let c = "10";
console.log("b의 타입:", typeof(b));  // number
console.log("c의 타입:", typeof(c));  // string

// 문자열을 숫자로 변환
let num = Number("123");  // 123
```

### 2) 조건문

```javascript
// 거짓으로 평가되는 값들
if (0) {          // false
if (false) {      // false
if (undefined) {  // false
if (null) {       // false

// 참으로 평가되는 값들
if (1) {          // true
if (2) {          // true
if ("abc") {       // true
if ([1,2,3]) {    // true
if (1.5) {        // true
if ([]) {         // true
```

### 3) 비교 연산자

```javascript
// 값 비교 (==)
console.log(1 == "1");  // true

// 값과 타입 모두 비교 (===)
console.log(1 === "1");  // false
console.log(1 === 1);    // true
```

## 3. 이벤트 핸들링

### 1) 클릭 이벤트

```javascript
// 버튼 클릭 시 이벤트 처리
btn1.addEventListener('click', function() {
  console.log(document.getElementById('text1').value);
});
```

### 2) 문제 해결 예시

```javascript
// 두 수의 합이 10 이상인지 확인하는 예제
checkBtn.addEventListener('click', function() {
  let num1 = Number(document.getElementById('num1').value);
  let num2 = Number(document.getElementById('num2').value);
  let sumNum = num1 + num2;
  let checkSumNum = sumNum >= 10;

  if (checkSumNum) {
    console.log("두 수의 합 " + String(sumNum) + "은 10 이상입니다");
  } else {
    console.log("두 수의 합 " + String(sumNum) + "은 10 이상이 아닙니다");
  }
});
```

## 4. Express.js 서버 설정

### 1) 기본 설정

```javascript
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);
```

### 2) 라우팅 설정

```javascript
// 라우팅 예시
app.get('/csstag', function(req, res) {
  res.sendfile("cssTag.html");
});

app.get('/js', function(req, res) {
  res.sendfile("js.html");
});

// 다른 페이지들
app.get('/probOne', function(req, res) {
  res.sendfile("probOne.html");
});
```

## 5. 참고사항

1. CSS 선택자 우선순위
   - id 선택자가 가장 높은 우선순위를 가짐
   - 중복된 id는 피해야 함

2. JavaScript 타입 변환
   - Number()를 사용하여 문자열을 숫자로 변환
   - String()을 사용하여 숫자를 문자열로 변환

3. 이벤트 핸들링
   - addEventListener를 사용하여 이벤트 리스너 등록
   - 클릭 이벤트는 'click'을 사용

4. Express.js
   - 라우팅을 통해 각 페이지를 처리
   - sendfile 메서드로 HTML 파일 전송
