var questions = {
    q1:{
        question:"Whats the capital of California",
        answer:["Sacramento","San&nbspFrancisco","Los&nbspAngeles","San&nbspJose"],
        img: "assets/images/California.png"
    },
    q2:{
        question:"The Earth is Flat",
        answer:["Yes","No","Only&nbspa&nbspsith&nbspdeals&nbspin&nbspabsolutes"],
        img: "assets/images/flatearth.jpg",
    
    },
    q3:{
        question:"In what place was Christmas illegal?",
        answer:["England","France","Brazil","Russia"],
        img: "assets/images/christmas.jpg",
    },
    q4:{
        question:"At what temperature are Fahrenheit and Celsius equal",
        answer:["0","-40","32","-100"],
        img: "assets/images/temperature.jpg",
    }
}
var answers = ["Sacramento","No","England","-40"];
var qCounter=1;
var intervalId;
var countdown=30;
var userAnswer=[];
var numCorrect=0;

$(document).on("click", "#startbutton", function(){
    nextQuestion();
})



function nextQuestion(){//append img and question choices
    pEmpty();
    clearInterval(intervalId);
    countdown = 30;
    //start timer, run function every 1 sec
    intervalId = setInterval(timer,1000);
    var questionInfo = questions["q"+qCounter]
    var img = $("<img>").attr("src",questionInfo.img);
    img.addClass("img-responsive");
    img.height(400)
    $("#content").append(img);
    var qText = $("<p>");
    qText.text(questionInfo.question);
    qText.addClass("question")
    $("#content").append(qText);
    
    for(i=0;i<questionInfo.answer.length;i++){//append radio buttons 
         $('<input type="radio" name="radiobtn" value ='+questionInfo.answer[i]+' >'+questionInfo.answer[i]+'</input>').appendTo('#buttons');
    }
    $("#buttons").append('<br><button class="btn btn-primary submit" type="button" value="Submit">Submit!</button>')
    $("#buttons").append("<div id=time></div>");
}

function timer(){
    countdown--;
    $("#time").html("<br>Time left: "+ countdown)
    if (countdown==0){
        timeout();
        qCounter++;
    }
}

//Store radio button values, load next question
    $(document).on("click",".submit", function(){
        userAnswer[qCounter-1] = $("#buttons input:radio:checked").val();
        qCounter ++;
        checkAnswer();
    })

function checkAnswer(){ 
    if (userAnswer[qCounter-2] == answers[qCounter-2]){
        numCorrect++;
        victory();
    }
    else{
        failure();
    }
}

function pEmpty(){
    $("#content").empty();
    $("#buttons").empty();
    $(".start").empty();
}
function victory(){
    pEmpty();
    $("#content").append("<h1>Correct!</h1>")
    endGame();
}
function failure(){
    pEmpty();
    $("#content").append("<img src='assets/images/wrong.gif'>")
    $("#content").append("<h1>Wrong!</h1>")
    endGame();
}
function timeout(){
    pEmpty();
    $("#content").append("<h1>Out of Time!</h1>")
    endGame();
    
}

function endGame(){
    if(qCounter == answers.length + 1){
        setTimeout(displayScore,5000);
    }
    else{
        setTimeout(nextQuestion,5000);
    }
}

function displayScore(){
    pEmpty();
    $("#content").append("<h1>Thats all!</h1>")
    $("#content").append("<br><p>Correct: "+ numCorrect)
    var numWrong = answers.length - numCorrect;
    $("#content").append("<br><p>Wrong: "+ numWrong)
    $("#content").append('<br><button class="btn btn-secondary restart" type="button" value="Restart">Restart!</button>')
}

$(document).on("click",".restart",function(){
    qCounter=1;
    countdown=30;
    userAnswer=[];
    numCorrect=0;
    nextQuestion();
})