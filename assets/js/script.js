var timerEl = document.getElementById("timer");
var rightWrongEl = document.getElementsByClassName("right-wrong");
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
var initialsList = [];
var questionsArray = [1, 2, 3, 4, 5];
var correctAns = '';
var timer = 60;
var j = 1;

timerEl.textContent = timer;

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

startEl.addEventListener("click", codeQuiz);
aEl.addEventListener('click', checkAns);
bEl.addEventListener('click', checkAns);
cEl.addEventListener('click', checkAns);
dEl.addEventListener('click', checkAns);
submitEl.addEventListener('click', saveScore)

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

  questionCardEl.hidden = false;
//   document.querySelector('.question-card').setAttribute('style', 'display: flex');
  console.log(correctAns);
}

function checkAns(event) {
    event.stopPropagation();
    if (event.target.textContent === correctAns && j < 5) {
        j++;
        console.log(j);
        questionAppear(j);
    } else if (event.target.textContent === correctAns) {
        setHighScore();
    } else if (j < 5) {
        timer -= 10;
        timerEl.textContent = timer;
        j++;
        questionAppear(j);
    } else {
        timer -= 10;
        timerEl.textContent = timer;
        setHighScore();
    }
}

function setHighScore() {
    questionCardEl.hidden = true;
    setScoreEL.hidden = false;
    scoreEL.textContent = timer;
}

function saveScore(event) {
    event.stopPropagation();

    var initials = initialsEl.value;
    initialsList.push(initials);

    localStorage.setItem(initials, timer);
    
    window.location = 'highscores.html';
    
    // TODO: Iterate through initialsList and push the keys and value pairs into high scores page
    for (i = 0; i < initialsList.length; i++) {
        
    }

}