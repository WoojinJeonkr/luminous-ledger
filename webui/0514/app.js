const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);
const db = require('./db');

app.get('/', function (req, res) {
    res.send('main');
});

// carPricePage
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

app.get('/postListPage', function(req, res) {
    res.sendfile('postListPage.html');
})

app.get('/getPostList', function(req, res) {
    let selectQuery = `select title from post`;

    db.query(selectQuery,
        function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        }
    )
})

// 함수로 만들어서 쓸 때
// function doQuery(query, callback) {
//     db.query(query, function(err, rows, fields) {
//         if (err) {
//             callback(err, null);
//             return;
//         }
//         callback(null, rows);
//     })
// }

// app.get('/getPostList', function(req, res) {
//     let selectQuery = `select * from post`;
//     doQuery(selectQuery, function(err, result) {
//         if (err) {
//             console.error("쿼리 실행 중 오류 발생:", err);
//             res.status(500).send("데이터베이스 오류가 발생했습니다.");
//             return;
//         }
//         res.json(result);
//     });
// })