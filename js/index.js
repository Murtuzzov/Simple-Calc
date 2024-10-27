let currentInput = "";
let operation = "";
let expression = "";

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;

  if (currentInput === "0" && number !== ".") currentInput = "";

  currentInput += number;
  updateDisplay();
}

function setOperation(op) {
  if (currentInput === "" && expression === "") return;

  if (currentInput !== "") {
    expression += currentInput + " " + op + " ";
    currentInput = "";
  } else if (expression.length > 0) {
    const trimmedExpression = expression.trim();
    const lastChar = trimmedExpression.slice(-1);

    if (!["+", "-", "*", "/"].includes(lastChar)) {
      expression = trimmedExpression + " " + op + " ";
    } else {
      expression = trimmedExpression.slice(0, -1) + " " + op + " ";
    }
  }

  updateDisplay();
}

function calculateResult() {
  if (currentInput === "" && expression.endsWith(" ")) {
    expression = expression.trim().slice(0, -1);
  } else if (currentInput !== "") {
    expression += currentInput;
  }

  try {
    if (/(\D|^)(0\d+)/.test(expression) || /(\.\d*\.)/.test(expression)) {
      throw new Error("Invalid input format");
    }

    const result = safeEval(expression);
    if (result === Infinity || isNaN(result)) {
      throw new Error("Cannot divide by zero");
    }

    currentInput = result.toString();
  } catch (error) {
    currentInput = "Error";
  }

  operation = "";
  expression = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  operation = "";
  expression = "";
  updateDisplay();
}

function backspace() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
  } else if (expression.length > 0) {
    expression = expression.slice(0, -1).trim();
  }
  updateDisplay();
}

function updateDisplay() {
  let displayValue = expression + (currentInput ? currentInput : "");
  const display = document.getElementById("display");
  display.value = displayValue;
  display.scrollLeft = display.scrollWidth;
}

function safeEval(expr) {
  const sanitizedExpr = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/[^0-9+\-*/(). ]/g, "");

  return Function('"use strict"; return (' + sanitizedExpr + ")")();
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    setOperation(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
