// Document variables
const highScoreBtn = document.querySelector('.high-score-btn');
const timer = document.querySelector('.timer')
const startScreen = document.querySelector('.start');
const startBtn = document.querySelector('.start-btn');
const quizScreen = document.querySelector('.quiz');
const question = document.querySelector('.question');
const ansA = document.querySelector('.A');
const ansB = document.querySelector('.B');
const ansC = document.querySelector('.C');
const ansD = document.querySelector('.D');
const feedback = document.querySelector('.feedback');
const endScreen = document.querySelector('.end');
const score = document.querySelector('.score');
const name = document.querySelector('.name');
const saveScoreBtn = document.querySelector('.save');
const scoreScreen = document.querySelector('.high-score');
const leaderboard = document.querySelector('.leaderboard');
const clearScoreBtn = document.querySelector('.clear');
const playAgainBtn = document.querySelector('.play-again');

//Questions
const questions = [];

//timer
var timeLeft = 61;

function startTimer() {
    let timerInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000)

};

//start quiz

//show questions

//check answer

//end quiz

//show high score

//event listeners
// highScoreBtn.addEventListener('click',);
// startBtn.addEventListener('click',);
// saveScoreBtn.addEventListener('click',);
// clearScoreBtn.addEventListener('click',);
// playAgainBtn.addEventListener('click',);
