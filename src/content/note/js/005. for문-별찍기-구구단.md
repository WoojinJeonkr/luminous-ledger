---
제목: for문 - 별찍기, 구구단
작성일: 2025-04-03
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
// for문 실습 페이지
app.get('/for', function (req, res) {
    res.sendfile("for.html");
});

// 구구단 페이지
app.get('/gugu', function (req, res) {
    res.sendfile("gugu.html");
});

// 별찍기 페이지들
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
```

## 2. for문 실습

### 1) 기본 for문 사용

```javascript
// 홀수 줄 별 찍기
let str;

for (let i = 1; i < 16; i=i+2) {
    str = "";
    for (let j = 0; j < i; j++) {
        str += "*";
    }
    console.log(str);
}
```

### 2) 구구단 출력

```javascript
// jQuery 라이브러리
<script src="http://code.jquery.com/jquery-latest.min.js"></script>

// 구구단 출력 함수
$('#guguBtn').click(function() {
    let inputNum = $('#inputNum').val();
    let printRes = "";
    if (inputNum <= 0) {
        $('div').html("입력 조건에 어긋납니다. (오류: 0이거나 음수)");
    } else {
        for (let i = 1; i < 10; i++) {
            let mulRes = Number(inputNum)*i;
            let printStr = inputNum + '*' + i + '=' + mulRes + '<br>';
            printRes = printRes + printStr;
            $('div').html(printRes);
        }
    }
});
```

## 3. 별찍기 실습

### 1) 직각삼각형(좌측)

```javascript
// 왼쪽 직각삼각형
for (let i = 1; i < 16; i=i+2) {
    let str = "";
    for (let j = 0; j < i; j++) {
        str += "*";
    }
    console.log(str);
}
```

### 2) 직각삼각형(우측)

```javascript
// 오른쪽 직각삼각형
for (let i = 1; i < 16; i=i+2) {
    let str = "";
    for (let j = 0; j < 16-i; j++) {
        str += " ";
    }
    for (let k = 0; k < i; k++) {
        str += "*";
    }
    console.log(str);
}
```

### 3) 정삼각형

```javascript
// 정삼각형
for (let i = 1; i < 16; i=i+2) {
    let str = "";
    for (let j = 0; j < 16-i; j++) {
        str += " ";
    }
    for (let k = 0; k < i; k++) {
        str += "*";
    }
    console.log(str);
}
```

### 4) 역삼각형

```javascript
// 역삼각형
for (let i = 15; i > 0; i=i-2) {
    let str = "";
    for (let j = 0; j < 16-i; j++) {
        str += " ";
    }
    for (let k = 0; k < i; k++) {
        str += "*";
    }
    console.log(str);
}
```

### 5) 마름모

```javascript
// 마름모
for (let i = 1; i < 16; i=i+2) {
    let str = "";
    for (let j = 0; j < 16-i; j++) {
        str += " ";
    }
    for (let k = 0; k < i; k++) {
        str += "*";
    }
    console.log(str);
}

for (let i = 15; i > 0; i=i-2) {
    let str = "";
    for (let j = 0; j < 16-i; j++) {
        str += " ";
    }
    for (let k = 0; k < i; k++) {
        str += "*";
    }
    console.log(str);
}
```

## 4. 참고사항

1. for문 구조
   - 초기값: 반복 시작 시점
   - 조건: 반복이 계속될 조건
   - 증가/감소: 각 반복마다 실행되는 동작

2. 문자열 조작
   - `+=`: 문자열 연결
   - `" ": 공백 문자
   - `"*": 별 문자

3. 조건문
   - if문: 조건에 따라 실행 여부 결정
   - else문: 조건이 거짓일 때 실행

4. jQuery 선택자
   - `#id`: id 선택자
   - `div`: 태그 선택자
   - `.html()`: HTML 내용 설정
