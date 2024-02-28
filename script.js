var topText = document.querySelector("#top")
var startBtn = document.querySelector(".start")
var question = document.querySelector(".question")
var answers = document.querySelector(".answer")
var scoreboard = document.querySelector("#scoreboard")
var test = document.querySelector(".test")
var timer = document.querySelector("#timer")
console.log (answers)


function startGame() {
    test.style.display = "block";
    topText.style.display = "none";
    startTimer();
    // answers.addEventListener('click', function() {
    //     showScore();
    // })
}

function showScore() {
    test.style.display = "none";
    scoreboard.style.display = "block";

}


function startTimer() {
    var time = 5;
    var timeInterval = setInterval(function() {
        if (time > 1) {
            timer.textContent = time + " Seconds Remaining";
            time--;
        
        } else if (time === 1) {
            timer.textContent = time + " Second Remaining";
            time--;
        } else if (time === 0) {
            timer.textContent = "TIME IS UP!";
            clearInterval(timeInterval)
            showScore();
        }
        console.log(time)
        
    }, 1000)
}

startBtn.addEventListener('click', startGame)




