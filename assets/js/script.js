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

// Here I created an object, bank, which stores the 5 questions, the 4 answer options, and the 1 correct answer
// Each question is titled by a number starting at 1, like the variable j. The questionAppear function will use the j value to call upon & display the correct question.
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

// This made sure that the buttons on index.html were being listened for, but not when highscores.html was open
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

// This is the main function that runs when the START button is clicked
// Inside the codeQuiz function is the countdown variable that sets the timer using an interval, the event listeners for the answer choices, and the checkAns function
// These are nested in codeQuiz because they all deal with the timer variable, that is also being manipulated by the countdown and the checkAns function
// These functions take advantage of global functions questionAppear & setHighScore
function codeQuiz(event) {
  event.stopPropagation();
  // Start a timer
  var countdown = setInterval(function () {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
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
      if (timer < 0) {
        timer = 0;
        timerEl.textContent = timer;
        rightWrongEl.textContent = "Incorrect";
        fadeOut(rightWrongEl);
        clearInterval(countdown);
        setHighScore();
      } else {
        timerEl.textContent = timer;
        rightWrongEl.textContent = "Incorrect";
        fadeOut(rightWrongEl);
        clearInterval(countdown);
        setHighScore();
      }
    }
  }

  startEl.hidden = true;

  questionAppear(j);
}

// questionAppear uses global variable j, initially set at 1 to move through the questions. Once a question is displayed, the checkAns function increases j by 1, insuring that the next question is the next in the progression.
// The options are randomized using a 'Fisher and Yates' method as I have in a previous project
// The text content of each button is updated and the question Card element is set to be visible by the user.
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
}

// When the last question has been answered OR when the timer hits 0, the user is directed to the set high score screen that is controlled by the function, called by checkAns
// This turns off the visibility of the question card and turns on the visibility of the input box and submit button for the user's initials
function setHighScore() {
  questionCardEl.hidden = true;
  setScoreEL.hidden = false;
  scoreEL.textContent = timer;
}

// When the submit button is clicked, saveScore is activated which saves the score and initials to local Storage and then opens the other html file, highscores.html
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

// This function is called when highscores.html has been loaded.
// This uses allStorage to return all the localStorage to the archive variable, then iterates through the length of that array and displays each as an li
function scoresFunction() {
  archive = allStorage();
  for (c = 0; c < archive.length; c++) {
    var newEl = document.createElement("li");
    newEl.textContent = archive[c];
    newEl.classList.add("displayScore");
    highScoreListEL.appendChild(newEl);
  }
}

// FadeOut function fades an element in 3 seconds
// When the function is called, it sets the opacity to 1, and uses this setInterval to decrease the opacity by .1 each 300 milliseconds
function fadeOut(content) {
  opacity = 1;
  var countdown2 = setInterval(function () {
    if (opacity == 0) {
      clearInterval(countdown2);
      content.setAttribute("style", "opacity: 0");
      return;
    } else {
      content.setAttribute("style", "opacity: " + opacity);
      opacity -= 0.1;
    }
  }, 300);
}
