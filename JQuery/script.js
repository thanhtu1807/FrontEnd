$(document).ready(function () {
  // bai 1
  $("#js-start-button").click(function () {
    let expression = randomTwoNumbers();
    $("#js-first-operand").attr("value", expression.firstOperand);
    $("#js-second-operand").attr("value", expression.secondOperand);
    $(this).attr("value", expression.result);
    $(this).addClass("started"); // started already
  });

  $(".js-choose-value > button").click(function () {
    const chooseValue = $(this).text();
    let correctCount = parseInt($("#js-correct-count").attr("value"));
    let incorrectCount = parseInt($("#js-incorrect-count").attr("value"));

    if (!$("#js-start-button").hasClass("started")) return;
    if (chooseValue === $("#js-start-button").attr("value").toString()) {
      $("#js-comment").attr("value", "Correct");
      correctCount++;
    } else {
      $("#js-comment").attr("value", "Incorrect");
      incorrectCount++;
    }
    updateDisplay(correctCount, incorrectCount);
  });

  // bai 2
  $(".js-calculation-2 .calculate").click(function () {
    const container = $(".js-calculation-2");
    console.log(container);
    convert(container);
  });

  // bai 3
  $(".js-calculation-3 .calculate").click(function () {
    const container = $(".js-calculation-3");
    convert(container);
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

function convert(container) {
  let inputString = container.find(".input").val();
  let input = Number(inputString);
  const fromMeasure = container.find("select.from :selected").text();
  const toMeasure = container.find("select.to :selected").text();
  if (isNaN(input) || !inputString) {
    container.siblings(".result").text("Please enter a number");
    return;
  }
  if (fromMeasure !== toMeasure) {
    input = convertMeasure(fromMeasure, input);
  }
  container.siblings(".result").text(input);
}

// $("#js-calculate-2").click(function () {
//   let input = Number($("#js-input-2").val());
//   const fromMeasure = $("#js-from-2").find(":selected").text();
//   const toMeasure = $("#js-to-2").find(":selected").text();
//   if (isNaN(input)) {
//     $("#js-result-2").text("Please enter a number");
//     return;
//   }
//   if (fromMeasure !== toMeasure) {
//     input = convertMeasure(fromMeasure, input);
//   }
//   $("#js-result-2").text(input);
// });
