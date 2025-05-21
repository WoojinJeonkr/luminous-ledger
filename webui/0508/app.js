const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);

app.get('/', function (req, res) {
    res.send('main');
});

// 복습
app.get('/qs', function (req, res) {
    res.send(`쿼리스트링 q의 값은 ${req.query.q}입니다.`);
});

app.get('/add', function (req, res) {
    res.send(Number(req.query.num1) + Number(req.query.num2) + "");
});

// 수업
app.get('/ajaxPage', function (req, res) {
    res.sendfile('ajax.html');
});

// 연습 - requestTest.html 관련
app.get('/getFile', function (req, res) {
    res.sendfile('requestTest.html');
});

app.get('/request1', function (req, res) {
    res.send('response1');
});

app.get('/request2', function (req, res) {
    res.send('response2');
});

app.get('/request3', function (req, res) {
    res.send('response3');
});

// 연습 - itemPage
app.get('/itemPage', function(req, res) {
    res.sendfile('itemPage.html');
});

app.get('/calcPrice', function(req, res) {
    let itemInfo = [
        {
            'item1': 1000,
            'item2': 5000,
            'item3': 10000,
            'item4': 30000,
            'item5': 50000,
            'item6': 100000,
            'item7': 500000,
            'item8': 1000000,
            'item9': 3000000
        }
    ]

    let inputPrice = Number(req.query.price);

    let items = itemInfo[0];
    let bestItem = null;
    let bestPrice = 0;

    for (let key in items) {
        let price = items[key];
        if (inputPrice >= price && price > bestPrice) {
            bestPrice = price;
            bestItem = key;
        }
    }

    let result = null;

    if (bestItem === null) {
        result = '구매 불가';
    } else {
        result = bestItem;
    }

    res.send(result);
});

// 연습 - carPricePage
app.get('/carPrice', function(req, res) {
    res.sendfile('carPricePage.html');
});

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