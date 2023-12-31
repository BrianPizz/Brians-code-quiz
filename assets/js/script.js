// Document variables
const headerEl = document.querySelector('header')
const highScoreBtn = document.querySelector('.high-score-btn');
const timer = document.querySelector('.timer')
const startScreen = document.querySelector('.start');
const startBtn = document.querySelector('.start-btn');
const quizScreen = document.querySelector('.quiz');
const questionEl = document.querySelector('.question');
const answerEl = document.querySelector('.answers');
const feedback = document.querySelector('.feedback');
const endScreen = document.querySelector('.end');
const scoreEl = document.querySelector('.score');
const nameEl = document.querySelector('.name');
const saveScoreBtn = document.querySelector('.save');
const scoreScreen = document.querySelector('.high-score');
const listEl = document.querySelector('.score-list');
const clearScoreBtn = document.querySelector('.clear-score');
const playAgainBtn = document.querySelector('.play-again');

//Questions
const questions = [
    {
        question: 'What does the “typeof” operator do in JavaScript?',
        options: [
            'a. Returns the data type of a variable',
            'b. Checks if a variable is defined',
            'c. Assigns a value to a variable',
            'd. Concatenates two strings'],
        answerIndex: 0,
    },
    {
        question: 'What does the “forEach” method do in JavaScript?',
        options: [
            'a. Adds a new element to the end of an array',
            'b. Removes an element from the beginning of an array',
            'c. Executes a function once for each element in an array',
            'd. Reverses the order of the elements in an array'],
        answerIndex: 2,
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        options: [
            'a. <scripting>',
            'b. <javascript>',
            'c. <script>',
            'd. <js>'],
        answerIndex: 2,
    },
    {
        question: 'How does a "for" loop start?',
        options: [
            'a. for(let i = 0; i <= 5; i++)',
            'b. for i = 1 to 5',
            'c. for(i <= 5; i++)',
            'd. for(i = 0; i <= 5)'],
        answerIndex: 0,
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        options: [
            'a. round(7.25)',
            'b. Math.rnd(7.25)',
            'c. rnd(7.25)',
            'd. Math.round(7.25)'],
        answerIndex: 3,
    },
];

// view scores
function showScore() {
    listEl.classList.remove('hide');
    startScreen.classList.add('hide');
    quizScreen.classList.add('hide');
    scoreScreen.classList.remove('hide');
    headerEl.classList.add('hide');
}

//timer
let timeLeft
let gameDone = false;
//timer stops when quiz is done or time hits 0
function startTimer() {
    timeLeft = 60;
    let timerInterval = setInterval(function () {
        timer.textContent = "Time left: " + timeLeft;
        if (timeLeft <= 0 || gameDone) {
            clearInterval(timerInterval);
            endGame();
        } else {
            timeLeft--;
        }
    }, 1000)
};

//start quiz
let score = 0;
//quiz screen is shown and timer startes
function startQuiz() {
    listEl.classList.remove('hide');
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    scoreScreen.classList.add('hide');
    startTimer();
    showQuestions();
};
//show questions
var questionNum = 0;
//the question at current index is displayed with answers
function showQuestions() {
    let currentQ = questions[questionNum];
    questionEl.textContent = currentQ.question;
    answerEl.textContent = '';
    currentQ.options.forEach(function (answer, index) {
        let answerBtn = document.createElement('button');
        answerBtn.classList.add('answer');
        answerBtn.classList.add('button');
        answerBtn.textContent = answer;
        answerBtn.addEventListener('click', function () { checkAnswer(index) });
        answerEl.appendChild(answerBtn);
    })
};
//check answer and increase question index 
function checkAnswer(index) {
    if (index === questions[questionNum].answerIndex) {
        feedback.textContent = "Correct!";
        feedback.classList.remove('wrong');
    } else {
        if (timeLeft >= 10) {
            timeLeft -= 10;
            feedback.textContent = "Wrong!";
            feedback.classList.add('wrong');
        } else {
            timeLeft -= timeLeft;
            feedback.textContent = "Wrong!";
            feedback.classList.add('wrong');
        }
    };
    questionNum++;
    if (questionNum < questions.length) {
        showQuestions();
    } else {
        gameDone = true;
        endGame();
    };
};
//end quiz and score time
function endGame() {
    quizScreen.classList.add('hide');
    scoreScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    scoreEl.textContent = timeLeft;
}
//Locally stored scores are added to hgih score list
renderScores();
var playerScoreArr;
var player;

function renderScores() {
    playerScoreArr = JSON.parse(localStorage.getItem('scores'));
    playerScoreArr?.sort(function (a, b) { return b.score - a.score });
    listEl.innerHTML = "";
    for (let i = 0; i < playerScoreArr?.length; i++) {
        let playerScore = document.createElement('li');
        playerScore.textContent = playerScoreArr[i].name + ': ' + playerScoreArr[i].score;
        listEl.appendChild(playerScore);
    };
}
//Scores are stored locally
function saveScore() {
    headerEl.classList.add('hide');
    endScreen.classList.add('hide');
    scoreScreen.classList.remove('hide');
    //player names and scores are stored in object
    player = {
        name: nameEl.value,
        score: timeLeft,
    };
    //current user and score is added to list
    let playerScore = document.createElement('li');
    playerScore.textContent = player.name + ': ' + player.score;
    listEl.appendChild(playerScore);
    //player objects are added to an array and stored
    if (playerScoreArr === null) {
        playerScoreArr = [player];
        localStorage.setItem('scores', JSON.stringify(playerScoreArr));
        console.log('in the null save');
    } else {
        playerScoreArr.push(player);
        localStorage.setItem('scores', JSON.stringify(playerScoreArr));
    };
    renderScores();
};
// play again button refreshes the page
function refreshPage() {
    window.location.reload();
}
//high score list is cleared and hidden
function clearScore() {
    localStorage.removeItem('scores');
    listEl.classList.add('hide');
}
//event listeners
highScoreBtn.addEventListener('click', showScore);
startBtn.addEventListener('click', startQuiz);
saveScoreBtn.addEventListener('click', saveScore);
clearScoreBtn.addEventListener('click', clearScore);