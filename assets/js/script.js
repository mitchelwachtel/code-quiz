var timerEl = document.getElementsByClassName('timer');
var rightWrongEl = document.getElementsByClassName('right-wrong');
var questionEl = document.getElementById('question');
var aEl = document.getElementById('A');
var bEl = document.getElementById('B');
var cEl = document.getElementById('C');
var dEl = document.getElementById('D');
var startEl = document.getElementById('start');


var bank = {
    question1: {
        question: 'Which array method removes the last element of the array?',
        answers: ['pop', 'push', 'shift', 'unshift'],
        correctAns: 'pop'
    },
    question2: {
        question: '',
        answers: [],
        correctAns: ''
    },
    question3: {
        question: '',
        answers: [],
        correctAns: ''
    },
    question4: {
        question: '',
        answers: [],
        correctAns: ''
    },
    question5: {
        question: '',
        answers: [],
        correctAns: ''
    }
}

startEl.addEventListener('click', codeQuiz);

function codeQuiz () {
    questionEl.textContent = bank.question1.question;
    aEl.textContent = 'A. ' + bank.question1.answers[0];
    bEl.textContent = 'B. ' + bank.question1.answers[1];
    cEl.textContent = 'C. ' + bank.question1.answers[2];
    dEl.textContent = 'D. ' + bank.question1.answers[3];
}