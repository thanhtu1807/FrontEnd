$(document).ready(function () {
  // Task 1
  $("#js-start").click(function () {
    let expression = randomTwoNumbers();
    $("#js-first-operand").attr("value", expression.firstOperand);
    $("#js-second-operand").attr("value", expression.secondOperand);
    $(this).attr("value", expression.result);
    $(this).addClass("started"); // started already
  });

  $(".js-content__result > button").click(function () {
    const chooseValue = $(this).text();
    let correctCount = parseInt($("#js-correct-count").attr("value"));
    let incorrectCount = parseInt($("#js-incorrect-count").attr("value"));

    if (!$("#js-start").hasClass("started")) return;
    if (chooseValue === $("#js-start").attr("value").toString()) {
      $("#js-comment").attr("value", "Correct");
      correctCount++;
    } else {
      $("#js-comment").attr("value", "Incorrect");
      incorrectCount++;
    }
    updateDisplay(correctCount, incorrectCount);
  });

  // Task 2
  $("#js-calculate-2").click(function () {
    convert($(this));
  });

  // Task 3
  $("#js-calculate-3").click(function () {
    convert($(this));
  });
});

function rand(n) {
  return Math.floor(Math.random() * (n + 1));
}

function randomTwoNumbers() {
  let firstOperand = rand(10);
  let secondOperand = rand(10);
  let result = undefined;
  do {
    firstOperand = rand(10);
    secondOperand = rand(10);
    result = firstOperand - secondOperand;
  } while (result < 0);
  return {
    firstOperand: firstOperand,
    secondOperand: secondOperand,
    result: result,
  };
}

function updateDisplay(correct, incorrect) {
  let percent = (correct / (correct + incorrect)) * 100;
  $("#js-correct-count").attr("value", correct);
  $("#js-incorrect-count").attr("value", incorrect);
  $("#js-correct-percent").attr("value", percent);
}

function convertMeasure(measure, input) {
  let output = undefined;
  switch (measure) {
    case "kg":
      output = input / 0.45359237;
      break;
    case "lb":
      output = input * 0.45359237;
      break;
    case "C":
      output = input * 1.8 + 32;
      break;
    case "F":
      output = (input - 32) / 1.8;
      break;
    default:
      break;
  }
  return output;
}

function convert(calculateBtn) {
  const firstRow = calculateBtn.parents(".first-row");
  const firstRowInput = firstRow.children(".first-row__input");
  const inputString = firstRowInput.val();
  let input = Number(inputString);
  const fromMeasure = firstRow.find(".first-row__from :selected").text();
  const toMeasure = firstRow.find(".first-row__to :selected").text();
  if (isNaN(input) || !inputString) {
    firstRow.next().text("Please enter a number");
    return;
  }
  if (fromMeasure !== toMeasure) {
    input = convertMeasure(fromMeasure, input);
  }
  firstRow.next().text(input);
}
