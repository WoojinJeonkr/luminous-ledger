---
제목: ajax와 자동차/아이템 가격 실습
작성일: 2025-05-08
---

## 1. Express.js 서버 및 라우팅

### 1) 기본 서버 설정

```javascript
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);
const db = require('./db');
```

### 2) 주요 라우팅

```javascript
// 자동차 가격 계산 페이지
app.get('/carPrice', function(req, res) {
    res.sendfile('carPricePage.html');
});

// 자동차 가격 계산 API
app.get('/getCarPrice', function(req, res) {
    let carBrandPrice = {
        'hyundai': 2100,
        'kia': 1300,
        'ssangyong': 1500,
        'benz': 3500,
        'bmw': 3200
    }
    let carColorPrice = {
        'red': 100,
        'blue': 120,
        'green': 200,
        'yellow': 130,
        'black': 80
    }
    let inputBrand = req.query.brand;
    let inputColor = req.query.color;
    let brandPrice = carBrandPrice[inputBrand];
    let colorPrice = carColorPrice[inputColor];
    let totalPrice = (brandPrice*colorPrice) / 10000;
    res.send(`최종 가격: ${totalPrice}만원`);
});

// 게시글 목록 페이지
app.get('/postListPage', function(req, res) {
    res.sendfile('postListPage.html');
});

// 게시글 목록 API (DB 연동)
app.get('/getPostList', function(req, res) {
    let selectQuery = `select title from post`;
    db.query(selectQuery,
        function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        }
    )
});
```

## 2. DB 연동 (MySQL)

### 1) DB 연결 및 쿼리

```javascript
let mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT,
    user: process.env.USER_NAME,
    password: process.env.PASSWD,
    database: 'webui'
});
let selectQuery = `select * from post`;
connection.query(selectQuery,
    function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    }
)
module.exports = connection;
```

## 3. 자동차 가격 계산기 (프론트엔드)

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

## 4. 게시글 목록 불러오기 (프론트엔드)

```html
<input type="button" id="btn" value="데이터 불러오기">
<div id="viewData"></div>
```

```javascript
$('#btn').click(function() {
    $('#viewData').append(`제목 목록<br>`)
    $.ajax({
        url: 'http://localhost/getPostList',
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                let title = data[i].title;
                $('#viewData').append(`${title}<br>`);
            }
        } 
    })
})
```

## 6. 주요 학습 내용 요약

- Express.js 서버와 라우팅 실습
- MySQL DB 연동 및 쿼리 실습
- ajax를 활용한 자동차 가격 계산기 구현
- ajax를 활용한 게시글 목록 불러오기 및 동적 UI 업데이트
