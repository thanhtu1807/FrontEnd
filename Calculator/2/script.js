class Calculator {
  constructor(outputTextElement, allClearButton) {
    this.outputTextElement = outputTextElement;
    this.allClearButton = allClearButton;
    this.clear();
  }

  clear() {
    this.allClearButton.innerText = "AC"
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.allClearButton.innerText === "AC") {
      this.allClearButton.innerText = "C";
    }
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand == "0") this.currentOperand = ""
    this.currentOperand += number;
  }

  chooseOperation(operation) {
    // Override operation
    if ((this.currentOperand === "") && (this.operation !== "undefined")) {
      this.operation = operation;
      return;
    }
    if (this.previousOperand !== "") {
      this.compute();
      this.updateDisplay();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(current) || isNaN(prev)) return;
    switch (this.operation) {
      case ("+"):
        result = prev + current;
        break;
      case ("-"):
        result = prev - current;
        break;
      case ("x"):
        result = prev * current;
        break;
      case ("÷"):
        result = prev / current;
        break;
      default:
        break;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.outputTextElement.innerText = this.currentOperand;
  }

}


const numberButtons = document.querySelectorAll("button[data-number");
const operationButtons = document.querySelectorAll("button[data-operation");
const equalButton = document.querySelector("button[data-equal]");
const allClearButton = document.querySelector("button[data-all-clear]");
const outputTextElement = document.querySelector(".output");

const calculator = new Calculator(outputTextElement, allClearButton);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  })
})

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
})

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
})