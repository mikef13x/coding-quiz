var topText = document.querySelector("#top")
var startBtn = document.querySelector(".start")
var question = document.querySelector(".question")
var answer1 = document.querySelector("#answer1")
var answer2 = document.querySelector("#answer2")
var answer3 = document.querySelector("#answer3")
var answer4 = document.querySelector("#answer4")
var scoreboard = document.querySelector("#scoreboard")
var scores = document.querySelector(".scores")
var test = document.querySelector(".test")
var timer = document.querySelector("#timer")
var answerBtns = document.querySelector("#answerBtns")
var initials = document.querySelector(".input")
var answerkey = document.querySelector(".answer")
var submitBtn = document.querySelector("#submitBtn")
var submitInit = document.querySelector("#submitInit")
var submitHere = document.querySelector("#submitHere")
var resetBtn = document.querySelector("#resetBtn")
var restartGameBtn = document.querySelector("#restartGameBtn")

const questionArray = [
    {
        title: "What does HTML stand for",
        answer: ["Hypertext Markup Language", "Hypertext Coding Language", "Hydrotext Marked Language", "Hyper Language Text"],
        correct: "Hypertext Markup Language"
    },
    {
        title: "What coding language allows functionality",
        answer: ["CSS", "HTML", "JavaScript", "All of the above"],
        correct: "JavaScript"
    },
    {
        title: "Which coding language is meant to change the style of the page",
        answer: ["JavaScript", "HTML", "Python", "CSS"],
        correct: "CSS"
    },
    {
        title: "What is another form of JavaScript",
        answer: ["HTML", "CSS", "jQuery", "None of the above"],
        correct: "jQuery"
    },
    {
        title: "What is the syntax to comment out code in CSS",
        answer: ["/*  */", "<!--  -->", "//", "All of the above"],
        correct: "//"
    },
]
var index = 0;

function displayTest() {
    question.textContent = questionArray[index].title;
    answer1.textContent = questionArray[index].answer[0];
    answer2.textContent = questionArray[index].answer[1];
    answer3.textContent = questionArray[index].answer[2];
    answer4.textContent = questionArray[index].answer[3];
    answer1.style = "color: black; background: white";
    answer2.style = "color: black; background: white";
    answer3.style = "color: black; background: white";
    answer4.style = "color: black; background: white";

}





function startGame() {
    startTimer();
    test.style.display = "block";
    topText.style.display = "none";
    displayTest();

}

function showScore() {
    test.style.display = "none";
    scoreboard.style.display = "block";
    initials.style.display = "none";

}

var time = 60;
var timeInterval = ""
function startTimer() {
    time = 60;
    timer.textContent = time + " Seconds Remaining";
    timeInterval = setInterval(function () {
        time--;
        if (time > 1) {

            timer.textContent = time + " Seconds Remaining";

        } else if (time === 1) {
            timer.textContent = time + " Second Remaining";

        } else if (time === 0) {
            timer.textContent = "TIME IS UP!";
            clearInterval(timeInterval)
            initialpage();
        }
       

    }, 1000)
}
function highlightAnswer(buttonText, currentSelector) {
    var correctAnswer = questionArray[index].correct;
    if (correctAnswer === buttonText) {
        currentSelector.style = "background-color:green; color: white";

    } else {
        currentSelector.style = "background-color:red; color: white";
        currentSelector.style.color = "white";
        time = time - 5;
    }
}

function nextQuestion(event) {
    if (event.target.matches("button")) {
        var buttonText = event.target.textContent;
        var currentSelector = event.target;
        highlightAnswer(buttonText, currentSelector);
        index++
        if (index < questionArray.length) {
            setTimeout(displayTest, 500);
        } else {
            setTimeout(initialpage, 500);
        }
    }
}

function stopTimer() {
    clearInterval(timeInterval)
    timer.style.display = "none";
}

function initialpage() {
    initials.style.display = "block";
    test.style.display = "none";
    scoreboard.style.display = "none";
    stopTimer()
}



function renderScores() {
    var submitInit = JSON.parse(localStorage.getItem("highScoreArray"));
    submitHere.textContent = '';
   
    submitInit.sort(function(a, b) {
        return parseInt(b.split(":")[1]) - parseInt(a.split(":")[1]);
    });
   

    for (var i = 0; i < submitInit.length; i++) {
        var li = document.createElement("li");
        li.textContent = submitInit[i];
        li.setAttribute("data-index", i);



        submitHere.appendChild(li);
    }

}

var highScoreArray = JSON.parse(localStorage.getItem("highScoreArray")) || [];


function postScore () {
    var initialSubmit = document.querySelector("#submitInit").value;

    if (initialSubmit !== "") {
        highScoreArray.push(initialSubmit + ": " + time);
        console.log(highScoreArray);
        localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
        renderScores();
        showScore();
    }
};

function clearScores() {
  
    localStorage.clear();
    renderScores();
}
function reloadPage() {
    window.location.reload();
}



restartGameBtn.addEventListener("click", reloadPage)

resetBtn.addEventListener("click", clearScores)

startBtn.addEventListener('click', startGame)

answerBtns.addEventListener('click', nextQuestion)


submitBtn.addEventListener("click", postScore)
