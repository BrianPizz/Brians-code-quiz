// Document variables
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
const nameListEl = document.querySelector('.name-list');
const scoreListEl = document.querySelector('.score-list');
const clearScoreBtn = document.querySelector('.clear');
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
            'a. for(i = 0; i <= 5; i++)',
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

//timer
let timeLeft = 61;

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
let score = 0;

function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    showQuestions();
};
//show questions
var questionNum = 0;


function showQuestions() {
    let currentQ = questions[questionNum];
    questionEl.textContent = currentQ.question;
    answerEl.textContent = '';
    currentQ.options.forEach(function (answer, index) {
        let answerBtn = document.createElement('button');
        answerBtn.classList.add('answer');
        answerBtn.textContent = answer;
        answerBtn.addEventListener('click',function(){ checkAnswer(index)});
        answerEl.appendChild(answerBtn);
    })
};
//check answer
function checkAnswer(index) {
    if(index === questions[questionNum].answerIndex){
        score += 20;
        feedback.textContent = "Correct!";
    } else {
        timeLeft -= 5;
        feedback.textContent = "Wrong!";
    };
    questionNum++;
    if(questionNum < questions.length && timeLeft > 0){
        showQuestions();
    } else {
        endGame();
    };
    
};
//end quiz
function endGame(){
    quizScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    scoreEl.textContent = score;
}
//show high score
function saveScore(){
    endScreen.classList.add('hide');
    scoreScreen.classList.remove('hide');
    let playerName = document.createElement('li');
    playerName.textContent = nameEl.value;
    nameListEl.appendChild(playerName);
    let playerScore = document.createElement('li');
    playerScore.textContent = score;
    scoreListEl.appendChild(playerScore);
};
//event listeners
// highScoreBtn.addEventListener('click',);
startBtn.addEventListener('click', startQuiz);
saveScoreBtn.addEventListener('click',saveScore);
// clearScoreBtn.addEventListener('click',);
// playAgainBtn.addEventListener('click',);
