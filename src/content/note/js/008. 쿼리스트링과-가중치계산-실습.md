---
제목: 쿼리스트링과 가중치 계산
작성일: 2025-04-24
---

## 1. Express.js 서버 및 쿼리스트링

### 1) 기본 서버 설정 및 라우팅

```javascript
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);

// 기본 라우팅
app.get('/', function (req, res) {
  res.send("res");
});
```

### 2) 쿼리스트링 처리

```javascript
// 쿼리스트링 값 읽기
app.get('/qs', function (req, res) {
  res.send(`쿼리스트링 q의 값은 ${req.query.q}입니다.`);
});

// 쿼리스트링으로 받은 두 수의 합 계산
app.get('/add', function (req, res) {
  let num1 = Number(req.query.num1);
  let num2 = Number(req.query.num2);
  res.send(`${num1}과 ${num2}의 합은 ${num1 + num2}입니다.`);
});
```

## 2. 교통수단 체크 실습

버스와 지하철의 운행 여부를 체크하여 귀가 가능 여부를 판단하는 실습입니다.

```javascript
$("#btn").click(function () {
    let isBus = false, isTrain = false;
    // 버스 운행 체크 (3개 노선)
    runBus1 = $('input[name="bus1"]:checked');
    runBus2 = $('input[name="bus2"]:checked');
    runBus3 = $('input[name="bus3"]:checked');
    runBus = [runBus1, runBus2, runBus3];

    // 지하철 운행 체크 (2개 노선)
    runTrain1 = $('input[name="train1"]:checked');
    runTrain2 = $('input[name="train2"]:checked');
    runTrain = [runTrain1, runTrain2];

    // 버스 운행 확인
    for (let i = 0; i < runBus.length; i++) {
        let runBusRadio = runBus[i].val();
        if (runBusRadio == "true") {
            isBus = true;
        }
    }

    // 지하철 운행 확인
    for (let i = 0; i < runTrain.length; i++) {
        let runTrainRadio = runTrain[i].val();
        if (runTrainRadio == "true") {
            isTrain = true;
        }
    }

    // 결과 출력
    if (isBus && isTrain) {
        alert("집에 가자!");
    } else {
        alert("갈 수 있는 교통편이 없어... 오늘은 야근이야..");
    }
});
```

## 3. 성적 가중치 계산기

### 1) 동적 라디오 버튼 생성

```javascript
function generateRadio(loopCount, divName, radioName, weightName) {
    for (let i = 0; i < loopCount; i++) {
        let newDiv = $('<div>', { id: `${divName}_${i}` });;
        newDiv.append(`${i + 1}번&ensp;`)
        // 0~4점 라디오 버튼 생성
        for (let j = 0; j < 5; j++) {
            let newInputRadio = `<label>${j}
                <input type="radio" name="${radioName}_${i}" value="${j}">
            </label>&ensp;`;
            newDiv.append(newInputRadio);
        }
        // 가중치 입력창 추가
        let inputWeight = `가중치<input id=${weightName}_${i}>`;
        newDiv.append(inputWeight);
        $('body').append(newDiv);
    }
}
```

### 2) 가중치 계산 함수

```javascript
function calculateResult(loopCount, radioName, weightName) {
    let total = 0;
    let expression = "";
    
    for (let i = 0; i < loopCount; i++) {
        // 선택된 점수와 가중치 가져오기
        let selectedVal = $(`input[name=${radioName}_${i}]:checked`).val();
        let weight = $(`#${weightName}_${i}`).val();

        // 값이 없는 경우 0으로 처리
        selectedVal = selectedVal !== undefined ? Number(selectedVal) : 0;
        weight = weight !== undefined ? Number(weight) : 0;

        // 계산식 생성
        total += selectedVal * weight;
        expression += `${selectedVal}X${weight}`;
        if (i < loopCount - 1) {
            expression += " + ";
        }
    }
    
    // 결과 출력
    $("#result").html(`${expression} = ${total}`);
}
```

### 3) 초기화 및 이벤트 바인딩

```javascript
$(document).ready(function () {
    // 3개의 문항 생성
    generateRadio(3, 'scoreDiv', 'scoreRadio', 'scoreWeight');
    
    // 계산 버튼 추가
    $('body').append(`<div id="result"></div>
    <input type="button" id="btn" value="계산">`);

    // 계산 버튼 클릭 이벤트
    $('#btn').click(function () {
        calculateResult(3, 'scoreRadio', 'scoreWeight');
    });
});
```
