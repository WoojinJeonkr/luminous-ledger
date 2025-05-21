---
제목: JavaScript 실습 및 문제 해결 - 로그인 폼,계산기,별찍기 구현
작성일: 2025-03-27
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
// 문제 1: 로그인 페이지
app.get('/login', function(req, res) {
    res.sendfile("./prob1/login.html");
});

// 문제 2: 계산기 페이지
app.get('/calc', function(req, res) {
    res.sendfile("./prob2/calcNum.html");
});

// 문제 3: for문 연습
app.get('/forMth1', function(req, res) {
    res.sendfile("./prob3/forMethod1.html");
});

// 문제 4: 별 그리기
app.get('/star1', function(req, res) {
    res.sendfile("./prob4/star1.html");
});
```

## 2. jQuery 실습

### 1) jQuery 기본 사용법

```javascript
// jQuery 선택자 사용
$("#loginBtn").click(function() {
    let loginId = $("#loginId").val();
    let loginPass = $("#loginPass").val();
    if (loginId == 'polytech' && loginPass == '12341234') {
        console.log("로그인 성공");
    } else {
        console.log("로그인 실패");
    }
});
```

## 3. 로그인 폼 구현

### 1) 기본 로그인 폼

```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
// 아이디 확인
if (document.getElementById('userIdBtn').addEventListener('click', function() {
    console.log(document.getElementById('userId').value);
}));

// 패스워드 확인
if (document.getElementById('userPwBtn').addEventListener('click', function() {
    console.log(document.getElementById('userPw').value);
}));

// 로그인 처리
document.getElementById('loginBtn').addEventListener('click', function() {
    let userId = document.getElementById('userId').value;
    let userPw = document.getElementById('userPw').value;
    if (userId == 'polytech' && userPw == '12341234') {
        console.log('로그인 성공');
    } else {
        console.log('로그인 실패');
    }
});
</script>
```

## 4. 계산기 구현

### 1) 세 수의 계산

```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
// 숫자 입력값 가져오기
let num1 = Number($("#num1").val());
let num2 = Number($("#num2").val());
let num3 = Number($("#num3").val());

// 합과 곱 계산
console.log("합: ", num1 + num2 + num3);
console.log("곱: ", num1 * num2 * num3);

// 최대값과 최소값 찾기
if (num1 == num2 && num2 == num3) {
    console.log("모든 숫자가 동일합니다.");
} else if (num1 == num2 && num1 > num3) {
    console.log("가장 큰수: ", num1);
    console.log("가장 작은수: ", num3);
} else if (num2 == num3 && num2 > num1) {
    console.log("가장 큰수: ", num2);
    console.log("가장 작은수: ", num1);
} else if (num1 == num3 && num1 > num2) {
    console.log("가장 큰수: ", num1);
    console.log("가장 작은수: ", num2);
}
</script>
```

## 5. for문 연습

### 1) 기본 for문

```javascript
// 1부터 10까지 배열로 반환
function getNumbers() {
    const numbers = [];
    for (let i = 1; !(i == 11); i++) {
        numbers.push(i);
    }
    return numbers;
}

// 실행 예시
getNumbers();
```

### 2) 별 그리기

```javascript
// 별 그리기 함수
function drawStars() {
    let result = "";
    for (let i = 1; i < 16; i = i + 2) {
        let star = "*";
        for (let j = 1; j < i; j++) {
            star = star + "*";
        }
        result += star + "\n";
    }
    return result;
}

// 실행 예시
drawStars(); 
```

## 6. 참고사항

1. jQuery 선택자
   - $("#id"): id 선택자
   - $(".class"): class 선택자
   - $("tag"): 태그 선택자

2. 이벤트 처리
   - click(): 클릭 이벤트 처리
   - val(): 입력값 가져오기
   - addEventListener: 이벤트 리스너 등록

3. for문 구조

   ```javascript
   for (초기값; 조건; 증가/감소) {
       // 실행할 코드
   }
   ```

4. 비교 연산자
   - '==': 값 비교
   - '===': 값과 타입 모두 비교
   - '>': 크다
   - '<': 작다
   - '&&': 그리고
   - '||': 또는
