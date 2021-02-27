// select all elements
const title = document.getElementById("title");
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const choiceE = document.getElementById("E");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What is a dwarf star?",
        imgSrc : "img/dwarf-star.jpg",
        choiceA : "A small, dim star",
        choiceB : "A star with almost no matter",
        choiceC : "A very bright star",
        choiceD : "An extremely massive star",
        choiceE : "A very big asteroid",
        correct : "A"
    },{
        question : "How old is the oldest tree in the world?",
        imgSrc : "img/oldest-tree.jpg",
        choiceA : "Over 100 years old",
        choiceB : "Over 500 years old",
        choiceC : "Over 1,000 years old",
        choiceD : "Over 5,000 years old",
        choiceE : "Over 10,000 years old",
        correct : "D"
    },{
        question : "Which animal can live the longest?",
        imgSrc : "img/oldest-animal.jpg",
        choiceA : "Elephant",
        choiceB : "Ocean Quahog",
        choiceC : "Immortal Jellyfish",
        choiceD : "Greenland Shark",
        choiceE : "Sea Turtle",
        correct : "C"
    },{
        question : "Who acted at the Greek theatres?",
        imgSrc : "img/greek-theater.jpg",
        choiceA : "Brad Pitt",
        choiceB : "a chorus and three actors",
        choiceC : "Professionally trained singers",
        choiceD : "High School students",
        choiceE : "Trained dogs",
        correct : "B"
    },{
        question : "When was the Taj Mahal built?",
        imgSrc : "img/Taj-Mahal.jpg",
        choiceA : "951 AD",
        choiceB : "2150 BC",
        choiceC : "31 BC",
        choiceD : "1991 AD",
        choiceE : "1653 AD",
        correct : "E"
    },{
        question : "How do mountain goats get a grip?",
        imgSrc : "img/mountain-goat.jpg",
        choiceA : "They have special hooves",
        choiceB : "They have suction cups",
        choiceC : "They have sticky feet",
        choiceD : "They have hollow bones",
        choiceE : "They have thumbs",
        correct : "A"
    },{
        question : "What are vaccinations?",
        imgSrc : "img/vaccination.jpg",
        choiceA : "A movie starring Robert DeNiro",
        choiceB : "A pill containing chicken soup",
        choiceC : "A microchip size amount of soap",
        choiceD : "A drug that fights infections",
        choiceE : "Medicine that prevents catching a disease",
        correct : "E"
    },{
        question : "What country do cockatiels originally come from?",
        imgSrc : "img/wild-cockatiels.jpg",
        choiceA : "Brazil",
        choiceB : "Japan",
        choiceC : "Australia",
        choiceD : "United States",
        choiceE : "South Africa",
        correct : "C"
    },{
        question : "When were the pyramids in Egypt built?",
        imgSrc : "img/pyramids.jpg",
        choiceA : "4500 years ago",
        choiceB : "6000 years ago",
        choiceC : "5 million years ago",
        choiceD : "1500 years",
        choiceE : "When the Greeks had a fight",
        correct : "A"
    },{
        question : "What is the fastest land animal in the world?",
        imgSrc : "img/fast-animals.jpg",
        choiceA : "Road Runner",
        choiceB : "Cheetah",
        choiceC : "Kangaroo",
        choiceD : "Coyote",
        choiceE : "Leopard",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    choiceE.innerHTML = q.choiceE;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    title.style.display = "none";
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    //const scorePerCent = Math.round(100 * score/questions.length);
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
