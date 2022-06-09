// declare starting variables
var highScore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#go-back");

// clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// retreive stored scores from local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.setAttribute("id", "high-score-li");
        createLi.textContent = allScores[i].initials + " - " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// go back to home page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});