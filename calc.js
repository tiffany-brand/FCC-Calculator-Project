let equation = [];
let operand = [];
let operators = ["+", "-", "*", "/"];
let answer = 0;
let answerDisp = false;


// clear all variables and arrays
function clearAll() {
  $("#display").text("0");
  $("#eqDisplay").text("");
  equation = [];
  operand = [];
  answer = 0;
  answerDisp = false;
}

// Number button click listener
$(".num").on("click", function () {
  if (answerDisp) {
    clearAll();
  }
  let multZero = this.value === "0" && equation[0] === "0"; // don't allow multiple leading zeroes

  // restrict number of digits to fit in display
  if (operand.length < 15 && !multZero) {
    equation.push(this.value);
    operand.push(this.value);
  }
  $("#display").text(operand.join(""));
  $("#eqDisplay").text(equation.join(""));
  console.log(equation);
});

// Decimal point click listener
$("#decimal").on("click", function () {
  if (answerDisp) {
    clearAll();
  }
  // check to make sure user doesn't type in more than one decimal point
  if (!operand.includes(this.value)) {
    equation.push(this.value);
    operand.push(this.value);
    $("#display").text(operand.join(""));
    $("#eqDisplay").text(equation.join(""));
  }
});

// Operator button click listener
$(".oper").on("click", function () {
  if (answer === "Error") {
    clearAll();
  }
  answerDisp = false;
  let multOper = operators.includes(equation[equation.length - 1]);
  let threeOper = multOper && operators.includes(equation[equation.length - 2]);

  // checking for a decimal before an operator
  if (equation[equation.length - 1] === ".") {
    equation[equation.length - 1] = this.value;

    // checking for multiple operators in a row
  } else if (!multOper && !threeOper) {
    equation.push(this.value);

    // treat the minus sign as a negative
  } else if (this.value === "-" && !threeOper) {
    equation.push(this.value);

    // get rid of extra operators
  } else if (this.value !== "-" && threeOper) {
    equation.pop()
    equation[equation.length - 1] = this.value;
  } else {
    equation[equation.length - 1] = this.value;
  }

  // equation can't start with a * or /
  if (equation[0] === "*" || equation[0] === "/") {
    equation.shift();
  }

  $("#eqDisplay").text(equation.join(""));
  operand = [];
});

// Equals sign click listener - do calculation and display answer
$("#equals").on("click", function () {
  answer = Math.round(10000000000 * eval(equation.join(""))) / 10000000000;

  // division by zero displays Error
  if (answer === Infinity || answer === -Infinity) {
    answer = "Error"
  }
  $("#display").text(answer);
  $("#eqDisplay").text(equation.join("") + " = ");

  // clear equation if Error
  if (answer === "Error") {
    equation = [];
    operand = [];
    answerDisp = true;

    // make answer the new operand
  } else {
    equation = [answer];
    operand = [answer];
    answerDisp = true;
  }

});

// Clear button click listener - reset variables
$("#clear").on("click", function () {
  clearAll();
});
