# JS 탐색하기 1

JavaScript의 기본 문법과 변수 선언 방법, 스코프, 호이스팅, 그리고 실제 사용 예시까지 폭넓게 알아봅니다.

## 1. 변수 선언 방식 비교

```javascript
// var 선언
var a = 1;

// let 선언
let b = 2;

// const 선언
const c = 3;
```

`var`는 함수 스코프, `let`과 `const`는 블록 스코프를 가집니다. `const`는 재할당이 불가능합니다.

## 2. 스코프와 호이스팅

```javascript
function testScope() {
  if (true) {
    var x = 10;
    let y = 20;
    const z = 30;
  }
  console.log(x); // 10
  // console.log(y); // ReferenceError
  // console.log(z); // ReferenceError
}

testScope();
```

`var`로 선언된 변수는 함수 전체에서 접근 가능하지만, `let`과 `const`는 블록 내부에서만 접근할 수 있습니다.

## 3. 실제 사용 예시

```javascript
// 배열의 합 구하기
const arr = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log('합계:', sum);
```

실무에서는 `let`과 `const`를 주로 사용하며, `const`를 기본으로, 값이 변경될 필요가 있을 때만 `let`을 사용합니다.
