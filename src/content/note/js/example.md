---
제목: JavaScript 기본 문법 예제
작성일: 2025-05-21
글자수: 1000
코드수: 2
---

# JavaScript Example

## Basic Syntax

```javascript
// This is a comment
console.log('Hello, World!');

// Variables
let name = 'John';
const age = 30;

// Functions
function greet(name) {
    return `Hello, ${name}!`;
}

// Arrays
const fruits = ['apple', 'banana', 'orange'];

// Objects
const person = {
    name: 'Alice',
    age: 25,
    greet: function() {
        return `Hi, I'm ${this.name}`;
    }
};
```

## HTML Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>HTML Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HTML Example</h1>
        <p>This is an example of HTML code with JavaScript integration.</p>
        <button onclick="alert('Button clicked!')" class="button">Click me</button>
        <div id="demo"></div>
        <script>
            document.getElementById('demo').innerHTML = 'This text was added by JavaScript';
        </script>
    </div>
</body>
</html>
```
