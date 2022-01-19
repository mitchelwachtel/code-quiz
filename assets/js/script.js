var timerEl = document.getElementsByClassName("timer");
var rightWrongEl = document.getElementsByClassName("right-wrong");
var questionEl = document.getElementById("question");
var aEl = document.getElementById("A");
var bEl = document.getElementById("B");
var cEl = document.getElementById("C");
var dEl = document.getElementById("D");
var startEl = document.getElementById("start");
var questionsArray = [1, 2, 3, 4, 5];

var bank = {
  1: {
    question: "Which array method removes the last element of the array?",
    answers: ["pop", "push", "shift", "unshift"],
    correctAns: "pop",
  },
  2: {
    question: "What does DOM stand for in JavaScript?",
    answers: [
      "Document Object Model",
      "Distributed Object Management",
      "Date Of Maturity",
      "Disk Order Map",
    ],
    correctAns: "Document Object Model",
  },
  3: {
    question: "What does API stand for in JavaScript?",
    answers: [
      "Application Programming Interface",
      "App Performance Index",
      "Advanced Programmer Index",
      "Advanced Platform Interface",
    ],
    correctAns: "Application Programming Interface",
  },
  4: {
    question: "Arr = [4, 3, 2, 1]. How would you select the element, 3, in JavaScript?",
    answers: ["Arr[1]", "Arr[2]", "Arr[3]", "Arr.2"],
    correctAns: "Arr[1]",
  },
  5: {
    question: "What data type is '3'?",
    answers: ["string", "number", "integer", "object"],
    correctAns: "string",
  },
};

var randomEl = function (array) {
  var index = Math.floor(Math.random() * array.length);
  var element = array[index];
  return element;
};

startEl.addEventListener("click", codeQuiz);

function codeQuiz() {
  // TODO: Start a timer

  // Display questions randomly with answer choices randomized and proceed to next question after a choice has been made
  for (i = 0; i < questionsArray.length; i++) {
    var p = randomEl(questionsArray);

    questionEl.textContent = bank[p].question;
    aEl.textContent = "A. " + bank[p].answers[0];
    bEl.textContent = "B. " + bank[p].answers[1];
    cEl.textContent = "C. " + bank[p].answers[2];
    dEl.textContent = "D. " + bank[p].answers[3];

    i++;
  }
}
