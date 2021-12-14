const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
// const timer = document.querySelector('#timer');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let correctAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'What is 2 + 2?',
    choices: ["2","4", "12", "17"],
    answer: "2",
  },
  {
    question: 'What is 2 + 2?',
    choices: ["2","4", "12", "17"],
    answer: "2",
  },
  {
    question: "2 + 2?",
    choice1: "2",
    choice2: "4",
    choice3: "12",
    choice4: "17",
    answer: 2,
  },
  {
    question: "2 + 2?",
    choice1: "2",
    choice2: "4",
    choice3: "12",
    choice4: "17",
    answer: 2,
  },
  {
    question: "2 + 2?",
    choice1: "2",
    choice2: "4",
    choice3: "12",
    choice4: "17",
    answer: 2,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 500)
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startGame()

// **** Timer ****

var timerEl = document.getElementById("timer");
var scoreEL = document.getElementById("scoreboard");

 countdown = () => {
  var timeLeft = 55;
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = "Time: " + timeLeft + " (seconds)";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      timerEl.textContent = "";

      clearInterval(timeInterval);

      displayMessage();
    }
  }, 1000);
}

 displayMessage = () => {
  var wordCount = 0;
  var msgInterval = setInterval(function () {
    if (words[wordCount] === undefined) {
      clearInterval(msgInterval);
    } else {
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 1000);
}

countdown();
