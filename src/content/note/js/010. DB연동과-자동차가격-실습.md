---
제목: DB 연동과 자동차 가격 실습
작성일: 2025-05-14
---

## 1. Express.js 서버 및 라우팅

### 1) 기본 서버 설정

```javascript
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);
```

### 2) 주요 라우팅

```javascript
// 쿼리스트링 응답
app.get('/qs', function (req, res) {
    res.send(`쿼리스트링 q의 값은 ${req.query.q}입니다.`);
});

// 두 수의 합
app.get('/add', function (req, res) {
    res.send(Number(req.query.num1) + Number(req.query.num2) + "");
});

// ajax 실습 페이지
app.get('/ajaxPage', function (req, res) {
    res.sendfile('ajax.html');
});

// 자동차 가격 계산
app.get('/carPrice', function(req, res) {
    res.sendfile('carPricePage.html');
});

// 아이템 가격 계산
app.get('/itemPage', function(req, res) {
    res.sendfile('itemPage.html');
});
```

## 2. ajax 기초 실습

버튼 클릭 시 ajax로 서버에 요청을 보내고, 응답을 받아 화면에 출력합니다.

```html
<input type="button" id="btn" value="버튼">
<div id="responseArea"></div>
```

```javascript
$("#btn").click(function () {
    $.ajax({
        url: 'http://localhost/qs?q=abc',
        success: function (data) {
            $("#responseArea").append(data + "<br>");
        }
    })
})
```

## 3. 여러 요청/응답 실습

여러 개의 버튼을 만들어 각각 다른 서버 엔드포인트에 ajax 요청을 보냅니다.

```html
<input type="button" id="btn1" value="request1">
<input type="button" id="btn2" value="request2">
<input type="button" id="btn3" value="request3">
```

```javascript
$('#btn1').click(function() {
    $.ajax({ url: 'http://localhost/request1', success: function(data) {
        console.log(`request1의 응답: ${data}`);
    }});
});
$('#btn2').click(function() {
    $.ajax({ url: 'http://localhost/request2', success: function(data) {
        console.log(`request2의 응답: ${data}`);
    }});
});
$('#btn3').click(function() {
    $.ajax({ url: 'http://localhost/request3', success: function(data) {
        console.log(`request3의 응답: ${data}`);
    }});
});
```

## 4. 아이템 가격 계산기

입력한 금액에 따라 구입 가능한 가장 비싼 아이템을 ajax로 계산합니다.

```html
<input type="text" id="inputPrice">
<input type="button" id="btn" value="구입확인">
<div id="responseArea"></div>
```

```javascript
$('#btn').click(function() {
    $.ajax({
        url: 'http://localhost/calcPrice',
        data: { price: $('#inputPrice').val() },
        success: function(data) {
            $('#responseArea').append(`${data}<br>`)
        }
    })
});
```

## 5. 자동차 가격 계산기

브랜드와 색상을 선택하면 ajax로 서버에 요청하여 최종 가격을 계산합니다.

```html
<label for="car-brand">차종 선택:</label>
<select id="car-brand" name="car-brand">
    <option value="hyundai">현대</option>
    <option value="kia">기아</option>
    <option value="ssangyong">쌍용</option>
    <option value="benz">벤츠</option>
    <option value="bmw">BMW</option>
</select>
<label for="car-color">색상 선택:</label>
<select id="car-color" name="car-color">
    <option value="red">빨강</option>
    <option value="blue">파랑</option>
    <option value="green">초록</option>
    <option value="yellow">노랑</option>
    <option value="black">검정</option>
</select>
<input type="button" id="btn" value="계산">
<div id="responseArea"></div>
```

```javascript
$('#btn').click(function() {
    $.ajax({
        url: 'http://localhost/getCarPrice',
        data: {
            'brand': $('#car-brand').val(),
            'color': $('#car-color').val()
        },
        success: function(data) {
            $('#responseArea').html(data);
        }
    })
});
```

## 6. 주요 학습 내용 요약

- Express.js 서버와 라우팅 실습
- ajax를 활용한 비동기 통신 및 동적 UI 업데이트
- 입력값에 따라 서버에서 계산 결과를 받아오는 실습(아이템, 자동차 가격)
- 여러 요청/응답 처리 및 실시간 결과 확인
