---
제목: JavaScript 배열 실습 및 문제 해결
작성일: 2025-04-10
---

## 1. Express.js 서버 설정

### 1) 기본 설정

```javascript
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);
```

### 2) 라우팅 설정

```javascript
// 배열 실습 페이지
app.get('/array', function (req, res) {
    res.sendfile("html/array.html");
});

// 문제 1
app.get('/prob1', function (req, res) {
    res.sendfile("practice/prob/prob1.html");
});

// 문제 2
app.get('/prob2', function (req, res) {
    res.sendfile("practice/prob/prob2.html");
});

// 문제 3
app.get('/prob3', function (req, res) {
    res.sendfile("practice/prob/prob3.html");
});

// 정답 1
app.get('/ans1', function (req, res) {
    res.sendfile("practice/answer/ans1.html");
});
```

## 2. 배열 기본 사용

### 1) 배열 생성 및 초기화

```javascript
// 빈 배열 생성
let arr = [];

// 배열에 값 추가
arr[0] = 1;
arr[1] = 2;
arr[2] = 3;
```

### 2) 배열 출력 방법

```javascript
// 방법 1: 배열 자체 출력
console.log(`arr [${arr}]`);

// 방법 2: 문자열로 변환하여 출력
let result = '';
for (let i = 0; i < arr.length; i++) {
    if (i != arr.length - 1) {
        result += arr[i] + ', ';
    } else {
        result += arr[i];
    }
}
console.log(`arr [${result}]`);
```

## 3. 문제 해결 실습

### 1) 문제 1: 1부터 10까지 배열

```javascript
// 배열 생성
let arr1 = [];
let lenArr1 = 10;
let arr1Result = '';

// 배열 채우기
for (let i = 0; i < lenArr1; i++) {
    arr1[i] = i + 1;
    if (i != lenArr1 - 1) {
        arr1Result += arr1[i] + ', ';
    } else {
        arr1Result += arr1[i];
    }
}

// 출력
console.log(`arr1 [${arr1}]`);
console.log(`arr1 [${arr1Result}]`);
```

### 2) 문제 2: 0부터 20까지 짝수 배열

```javascript
// 배열 생성
let arr2 = [];
let lenArr2 = 11;
let arr2Result = '';

// 배열 채우기
for (let i = 0; i < lenArr2; i++) {
    arr2[i] = i * 2;
    if (i != lenArr2 - 1) {
        arr2Result += arr2[i] + ', ';
    } else {
        arr2Result += arr2[i];
    }
}

// 출력
console.log(`arr2 [${arr2}]`);
console.log(`arr2 [${arr2Result}]`);
```

## 4. 참고사항

1. 배열 기본 개념
   - 배열은 여러 값을 하나의 변수에 저장할 수 있는 자료구조
   - 인덱스(index)를 통해 각 요소에 접근
   - length 속성을 통해 배열의 길이 확인

2. 배열 출력 방법
   - ${arr}: 배열을 문자열로 변환하여 출력
   - 직접 문자열 조합: 각 요소를 순회하며 문자열로 변환

3. 배열 초기화
   - 빈 배열: let arr = []
   - 요소 포함 배열: let arr = [1, 2, 3]

4. 배열 접근
   - 인덱스를 통한 접근: arr[0], arr[1], ...
   - 길이 확인: arr.length
