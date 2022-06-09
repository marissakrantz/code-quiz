// declare variables
const timerEl = document.getElementById('countdown');
const startButton = document.getElementById("start-button");
const homeScreen = document.getElementById('home-screen');

let score = 0;
let questionIndex = 0;

let secondsLeft = 61;
let holdInterval = 0;
let penalty = 10;
// create a new element
const ulCreate = document.createElement("ul");

const questions = [
  {
    questionToAsk: "Inside which HTML element do we put the JavaScript❓",
    choices: ["<script>", "<js>", "<java>", "<javascript>"],
    answer: "<script>",
  },
  {
    questionToAsk: "Where is the correct place to insert a JavaScript❓",
    choices: ["<head> section", "<body> section", "either one, it doesn't matter"],
    answer: "<body> section",
  },
  {
    questionToAsk: "The condition in an if/else statement is enclosed within _____.",
    choices: ["Quotes", "Curley Brackets", "Parentheses", "Square Brackets"],
    answer: "Parentheses",
  },
  {
    questionToAsk: "Commonly used data types DO NOT include:",
    choices: ["String", "Booleens", "Numbers", "Alerts"],
    answer: "Alerts",
  },
  {
    questionToAsk: "Arrays in JavaScipt can be used to store what❓",
    choices: ["Numbers & Strings", "Other Arrays", "Booleans", "All of the Above"],
    answer: "All of the Above",
  },
];

// triggers timer on button click, shows user a display on the screen
startButton.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      timerEl.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        timerEl.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

// brings questions and choices to page 
function render(questionIndex) {
  // clear existing data 
  homeScreen.innerHTML = "";
  ulCreate.innerHTML = "";
  // loop through all info in array
  for (var i = 0; i < questions.length; i++) {
    // appends questions only
    var userQuestion = questions[questionIndex].questionToAsk;
    var userChoices = questions[questionIndex].choices;
    var createH2 = document.createElement("h2");
    createH2.setAttribute("id", "createH2");
    createH2.textContent = userQuestion;
  }
  homeScreen.appendChild(createH2);

  // new for each for question choices
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.setAttribute("id", "answers-li");
    listItem.textContent = newItem;
    homeScreen.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (compare));
  })
}

//compare choices with answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    // if correct condition, else wrong
    if (element.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent = "Correct!";
    } else {
      // deduct -10 seconds for wrong answers
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent = "Wrong! The correct answer was:  " + questions[questionIndex].answer;
    }

  }
  //determines number question user is on
  questionIndex++;

  if (questionIndex >= questions.length) {
    // append last page with user stats
    allDone();
    createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
  } else {
    render(questionIndex);
  }
  homeScreen.appendChild(createDiv);

}

// append last page
function allDone() {
  homeScreen.innerHTML = "";
  timerEl.innerHTML = "";

  // heading:
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";

  homeScreen.appendChild(createH1);

  // paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  homeScreen.appendChild(createP);

  // calculates time remaining and replaces it with score
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    homeScreen.appendChild(createP2);
  }

  // label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  homeScreen.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  homeScreen.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("id", "submit");
  createSubmit.textContent = "Submit";

  homeScreen.appendChild(createSubmit);

  // capture initials, add to local storage
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

      console.log("No value entered!");

    } else {
      let finalScore = {
        initials: initials,
        score: timeRemaining
      }
      console.log(finalScore);
      let allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      let newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      // go to highscores page
      window.location.replace("./highscores.html");
    }
  });

}