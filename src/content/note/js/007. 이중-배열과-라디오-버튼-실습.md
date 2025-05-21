---
제목: 이중 배열과 라디오 버튼
작성일: 2025-04-17
---

## 1. Express.js 서버 및 라우팅 기본

```javascript
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
```

## 2. 이중 배열 실습

### 1) 이중 배열 생성 및 값 할당

여러 명의 학생 이름을 2차원 배열로 저장하고, 각 값을 출력해보았습니다.

```javascript
let student = [];
student[0] = ['홍길동', '김철수', '박영희'];
student[1] = ['가가', '가나', '가다'];
student[2] = ['나가', '나나', '나다'];

console.log(`student[2][1] : ${student[2][1]}, student[2][2] : ${student[2][2]}`);
```

### 2) 이중 배열 반복문 활용 및 값 채우기

```javascript
let arr = [];
for (let i = 0; i < 3; i++) {
  arr[i] = [];
  for (let j = 0; j < 4; j++) {
    arr[i][j] = i;
  }
}
arr.push('A');
arr.push('123');
console.log(arr);
```

## 3. 이중 배열 문제 풀이

### 1) 5x5 2차원 배열에 1부터 25까지 채우기

```javascript
let arr1 = [];
let arr1Cnt = 1;
for (let i = 0; i < 5; i++) {
  arr1[i] = [];
  for (let j = 0; j < 5; j++) {
    arr1[i][j] = arr1Cnt++;
  }
}
console.log(arr1);
```

### 2) 5x5 2차원 배열에 각 칸에 (이전 값 * 3 + 1)로 채우기

```javascript
let arr2 = [];
let arr2Cnt = 0;
for (let i = 0; i < 5; i++) {
  arr2[i] = [];
  for (let j = 0; j < 5; j++) {
    arr2[i][j] = arr2Cnt * 3 + 1;
    arr2Cnt++;
  }
}
console.log(arr2);
```

### 3) 5x5 2차원 배열에 각 칸에 i * j 값으로 채우기

```javascript
let arr3 = [];
for (let i = 0; i < 5; i++) {
  arr3[i] = [];
  for (let j = 0; j < 5; j++) {
    arr3[i][j] = i * j;
  }
}
console.log(arr3);
```

### 4) 5x5 2차원 배열에 각 칸에 "ij" 문자열로 채우기

```javascript
let arr4 = [];
for (let i = 0; i < 5; i++) {
  arr4[i] = [];
  for (let j = 0; j < 5; j++) {
    arr4[i][j] = `${i}${j}`;
  }
}
console.log(arr4);
```

## 4. 라디오 버튼 선택값 찾기 실습

for문과 document.getElementsByName을 활용하여, 여러 개의 라디오 버튼 중 선택된 값을 확인하는 방법을 실습했습니다.

```javascript
for (let i = 0; i < 7; i++) {
  $("#radioArea").append(`${i+1}<input type="radio" name="r" value="" /> `)
}

$('#btn').click(function() {
  let inputRadio = document.getElementsByName('r');
  let radioNum = inputRadio.length;
  for (let i = 0; i < radioNum; i++) {
    if (inputRadio[i].checked) {
      alert(`${i+1}번 radio가 선택되었습니다.`);
      return;
    }
  }
  alert(`radio를 선택해주세요.`);
});
```
