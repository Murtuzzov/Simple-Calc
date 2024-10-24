let currentInput = ""; // Хранит текущий ввод
let operation = ""; // Хранит выбранную операцию
let expression = ""; // Хранит все введенные числа и операции

// Функция для добавления числа в текущий ввод
function appendNumber(number) {
  currentInput += number; // Добавляем нажатую цифру к текущему вводу
  updateDisplay(); // Обновляем отображение на экране
}

// Функция для установки операции
function setOperation(op) {
  if (currentInput === "") return; // Если текущий ввод пуст, выходим из функции
  expression += currentInput + " " + op + " "; // Добавляем текущее число и операцию в выражение
  operation = op; // Сохраняем операцию
  currentInput = ""; // Очищаем текущий ввод для следующего числа
  updateDisplay(); // Обновляем дисплей после установки операции
}

// Функция для вычисления результата
function calculateResult() {
  if (currentInput === "") return; // Если текущий ввод пуст, выходим из функции
  expression += currentInput; // Добавляем последнее число в выражение

  try {
    // Проверяем на деление на ноль
    if (expression.includes("÷ 0") || expression.includes("/ 0")) {
      currentInput = "Error"; // Если есть деление на ноль, выводим сообщение об ошибке
    } else {
      // Вычисляем результат с помощью eval (или другого безопасного метода)
      const result = eval(expression.replace(/×/g, "*").replace(/÷/g, "/"));
      currentInput = result.toString(); // Обновляем текущий ввод результатом
    }
  } catch (error) {
    currentInput = "Error"; // Обработка ошибок
  }

  operation = ""; // Очищаем операцию
  expression = ""; // Очищаем выражение
  updateDisplay(); // Обновляем отображение на экране
}

// Функция для очистки всех введенных данных
function clearDisplay() {
  currentInput = ""; // Очищаем текущий ввод
  operation = ""; // Очищаем операцию
  expression = ""; // Очищаем выражение
  updateDisplay(); // Обновляем отображение
}

// Функция для обновления отображения на экране
function updateDisplay() {
  // Формируем строку для отображения: текущее выражение + текущее число
  let displayValue = expression + (currentInput ? currentInput : "");
  document.getElementById("display").value = displayValue; // Устанавливаем значение в поле ввода
}
