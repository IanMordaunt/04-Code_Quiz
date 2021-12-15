// create vairables to target all DOM elements
var timeEl = document.getElementById("time");
var container1 = document.getElementById("home");
var startGameEl = document.getElementById("startGame");
var questionContainer = document.getElementById("questionContainer");
var questionTitle = document.getElementById("questionTitle");
var questionOptions = document.getElementById("questionOptions");
var endContainer = document.getElementById('endContainer');
var finalScore = document.getElementById('finalScore');
var messageResponce = document.getElementById('messageResponce')

//additonal vairables
var timeLeft = 30;
var endinterval = 0;
var timeinterval;
let questionCounter = 0;
let score = 100

let highScore = JSON.parse(localStorage.getItem('finalScore')) || []

finalScore.innerText = finalScore

//questions

let questions = [
  {
    question: "What does CSS stand for?",
    choices: ["Computer Solid State", "Cascading Styling Sheet", "Coding Styling Syntex", "Collected System Storage"],
    answer: "Cascading Styling Sheet",
  },
  {
    question: 'What special symbols do you use to indicate an Array?',
    choices: ["**","()", "{}", "[]"],
    answer: "[]",
  },
  {
    question: 'An "id" class in JavaScript is represented in what special character in CSS ?',
    choices: [".","=", "#", "%"],
    answer: "#",
  },
  {
    question: 'In JavaScript how do you represent strict equality?',
    choices: ["=","==", "===", "===="],
    answer: "===",
  },
  {
    question: 'What is a type of boolean in JS?',
    choices: ["22","hello", "true", "$"],
    answer: "true",
  },
];

//create a function that will start the game
function start() {
  //game starts: need to hidecontainer1, need to show the questionContainer, need to start my timer

  container1.setAttribute("class", "hide");
  questionContainer.removeAttribute("class");

  timeinterval = setInterval(function () {
    //update the time on the page
    timeLeft--;
    timeEl.textContent = timeLeft;


    //conditional for if the clock has ran out

    if (timeLeft <= 0) {
        clearInterval(timeinterval);
        timeEl.textContent = 0;
    }
  }, 1000);

  timeEl.textContent = timeLeft;

  //call a function that displays your quuestions

  getNewQuestion();
}

function stopTime() {
    clearInterval(timeinterval);
}

function getNewQuestion() {
  var currentQuestion = questions[questionCounter];

  localStorage.setItem('finalScore', score)

  //display questionTitle on the page
  questionTitle.textContent = currentQuestion.question;

  questionOptions.innerHTML = "";

  //loop to create buttons

  currentQuestion.choices.forEach((choice) => {
    //create buttons for every choice in the array
    var choiceBtn = document.createElement("button");
    //choiceBtn.setAttribute('class', )
    choiceBtn.setAttribute("value", choice);

    choiceBtn.textContent = choice;

    choiceBtn.onclick = checkAnswer;

    questionOptions.append(choiceBtn);
  });
}

function checkAnswer(){
    if(this.value !== questions[questionCounter].answer){
        timeLeft -= 5
        displayMessage('Incorrect!');
    }else {
        displayMessage('Correct!');
        incrementScore(score)
    }
      
    questionCounter++;

    if (questionCounter === questions.length) {
       over();
        
      } else{
          getNewQuestion()
      } 
}



function displayMessage(string) {
    messageResponce.textContent = string;
    setTimeout(function () {
        messageResponce.textContent = "";
    }, 2000);
}


    //game over function 
function over() {
    questionContainer.setAttribute('class','hide');
    endContainer.removeAttribute('class');
}

    // Final Score
function incrementScore(num) {
    score +=num
    finalScore.innerText = score

}

function saveScore(event) {
    event.preventDefault()

    const score = {
        score: finalScore,
        name: username.value
    }

    highScore.push(score)

   highScore.sort((a,b) => {
      return b.score - a.score
    })

    highScore.splice(5)

    localStorage.setItem('highScore', JSON.stringify(finalScore))
    windowl.location.assign('/')
}
console.log(finalScore);


// function TimesUp() {
//     if (timeLeft <= 0) {
//     clearInterval(endinterval);
//     allDone();
//     timeLeft.textContent = "Time's Up!";
// } 


    //  Saving Highscore

// const highScore = JSON.parse(localStorage.getItem('highScores')) || []

// const MAX_HIGH_SCORE = 5

// finalScore.innerText = mostRecentScore


// localStorage.setItem('finalScore', JSON.stringify(finalScore));
    //listener a the bottom of the page to start the game on buttom click

startGameEl.onclick = start;
