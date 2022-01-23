var timerEl = document.getElementById("timer");
var rightWrongEl = document.getElementById("right-wrong");
var questionEl = document.getElementById("question");
var aEl = document.getElementById("buttonA");
var bEl = document.getElementById("buttonB");
var cEl = document.getElementById("buttonC");
var dEl = document.getElementById("buttonD");
var startEl = document.getElementById("start");
var highScoreListEL = document.getElementById("highscore-list");
var setScoreEL = document.getElementById("set-score");
var scoreEL = document.getElementById("score");
var questionCardEl = document.getElementById("question-card");
var submitEl = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var correctAns = "";
var timer = 60;
var j = 1;
var archive = [];
var opacity;

// Since this js is being used for 2 html pages, I had to make sure that the element exists on the page before setting content to it.
if (timerEl !== null) {
  timerEl.textContent = timer;
}

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

// var randomEl = function (array) {
//   var index = Math.floor(Math.random() * array.length);
//   var element = array[index];
//   return element;
// };

if (
  startEl !== null &&
  aEl !== null &&
  bEl !== null &&
  cEl !== null &&
  dEl !== null &&
  submitEl !== null
) {
  startEl.addEventListener("click", codeQuiz);

  submitEl.addEventListener("click", saveScore);
}

function codeQuiz(event) {
  event.stopPropagation();
  // TODO: Start a timer
  var countdown = setInterval(function () {
    timer--;
    timerEl.textContent = timer;
    if (timer == 0) {
      clearInterval(countdown);
      setHighScore();
    }
  }, 1000);

  aEl.addEventListener("click", checkAns);
  bEl.addEventListener("click", checkAns);
  cEl.addEventListener("click", checkAns);
  dEl.addEventListener("click", checkAns);

  function checkAns(event) {
    event.stopPropagation();
    event.preventDefault();
    if (event.target.textContent === correctAns && j < 5) {
      j++;
      rightWrongEl.textContent = "Correct";
      fadeOut(rightWrongEl);
      questionAppear(j);
    } else if (event.target.textContent === correctAns) {
      rightWrongEl.textContent = "Correct";
      fadeOut(rightWrongEl);
      clearInterval(countdown);
      setHighScore();
    } else if (j < 5) {
      timer -= 10;
      timerEl.textContent = timer;
      j++;
      rightWrongEl.textContent = "Incorrect";
      fadeOut(rightWrongEl);
      questionAppear(j);
    } else {
      timer -= 10;
      timerEl.textContent = timer;
      rightWrongEl.textContent = "Incorrect";
      fadeOut(rightWrongEl);
      clearInterval(countdown);
      setHighScore();
    }
  }

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

  questionCardEl.hidden = false;
  //   document.querySelector('.question-card').setAttribute('style', 'display: flex');
  console.log(correctAns);
}

function setHighScore() {
  questionCardEl.hidden = true;
  setScoreEL.hidden = false;
  scoreEL.textContent = timer;
}

function saveScore(event) {
  event.stopPropagation();
  event.preventDefault();

  var initials = initialsEl.value;

  localStorage.setItem(initials, timer);

  window.location = "highscores.html";
}

// Grabs all the local storage keys and values

function allStorage() {
  var stuff = [];
  var keys = Object.keys(localStorage);
  var key;

  for (i = 0; (key = keys[i]); i++) {
    stuff.push(key + ":  " + localStorage.getItem(key));
  }

  return stuff;
}

function scoresFunction() {
  archive = allStorage();
  for (c = 0; c < archive.length; c++) {
    var newEl = document.createElement("li");
    newEl.textContent = archive[c];
    newEl.classList.add("displayScore");
    highScoreListEL.appendChild(newEl);
  }
}

function displayHighscores(archive) {
  highScoreListEL.textContent = archive[0];
}

function fadeOut(content) {
  opacity = 1;
  var countdown2 = setInterval(function () {
    if (opacity == 0) {
      clearInterval(countdown2);
      content.setAttribute("style", "opacity: 0");
      return;
    }
    content.setAttribute("style", "opacity: " + opacity);
    opacity = opacity - 0.1;
  }, 300);
}
