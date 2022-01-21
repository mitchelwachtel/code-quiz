var timerEl = document.getElementsByClassName("timer");
var rightWrongEl = document.getElementsByClassName("right-wrong");
var questionEl = document.getElementById("question");
var aEl = document.getElementById("buttonA");
var bEl = document.getElementById("buttonB");
var cEl = document.getElementById("buttonC");
var dEl = document.getElementById("buttonD");
var startEl = document.getElementById("start");
var listEL = document.getElementById("list");
var questionCardEl = document.getElementsByClassName("question-card");
var questionsArray = [1, 2, 3, 4, 5];
var correctAns = '';
var timer = 60;
var j = 1;

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
    question:
      "Arr = [4, 3, 2, 1]. How would you select the element, 3, in JavaScript?",
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
aEl.addEventListener('click', checkAns);
bEl.addEventListener('click', checkAns);
cEl.addEventListener('click', checkAns);
dEl.addEventListener('click', checkAns);

function codeQuiz(event) {
   event.stopPropagation();
    // TODO: Start a timer

  // Do questions need to appear randomly?

  startEl.hidden = true;

  questionAppear(j);

}

function questionAppear(j) {
  correctAns = bank[j].correctAns;
  var options = [0, 1, 2, 3];
  var w = [];
    while (options.length > 0) {
        var n = Math.floor(Math.random() * options.length);
        w.push(options[n]);
        options.splice(n, 1);
    }
  
  questionEl.textContent = bank[j].question;
  aEl.textContent = bank[j].answers[w[0]];
  bEl.textContent = bank[j].answers[w[1]];
  cEl.textContent = bank[j].answers[w[2]];
  dEl.textContent = bank[j].answers[w[3]];
  document.querySelector('.question-card').setAttribute('style', 'display: flex');
  console.log(correctAns);
}

function checkAns(event) {
    event.stopPropagation();
    if (event.target.textContent === correctAns) {
        console.log('hooray!');
        j++;
        questionAppear(j);
    } else {
        console.log('boo!');
        j++;
        questionAppear(j);
    }
}