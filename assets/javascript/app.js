window.onload = function() {
    console.log("onload");
    $("#start").on("click",start);
    $("#finish").on("click",stop);
    $(".answerInput").on("click",evaluate);
}
var countdownTimer;
var time = 30;
var correctAnswers = [];
var userAnswers = [];
var gameQuestions = [
    ["What color is the sky?",["blue","skillet","biscuit","dog"],0],//a
    ["How many dwarfs in Snow White?",[2,7,9,10],1],//b
    ["Who is the real Batman?",["John Wayne","Wayne Newton","Bruce Wayne","Lil Wayne"],2],//c
    ["Where was the gunfight at OK coral?",["Pearl Harbor, HI","Gettysburg, PA","Deadwood, SD, ","Tombstone, AZ"],3]//d
];
/*
*   function starts the game and timer
*/
function start() {

    console.log("start");
    console.log(gameQuestions.length);
    $(".end").css("display","none");
    $(".begin").css("display","inline");
    $("#start").css("display","none");
    $("#finish").css("display","inline");

    countdownTimer = setInterval(function() {
    time--;
    console.log(time);
    $("#countdown-timer").text(time);
    console.log($("#countdown-timer").val());
    if(time <= 0) {
        stop();
        // clearInterval(countdownTimer);
    }
   }, 1000);

   showQuestions();
}
function stop () {
    clearInterval(countdownTimer);
    var correctCounter = 0;
    var incorrectCounter = 0;
    for(var i=0;i<userAnswers.length; i++) {
        
        if(userAnswers[i] === correctAnswers[i]) {
            correctCounter++;
        }
        else{
            incorrectCounter++;
        }
    }
    var br = $("<br>");
    $(".end").append(br);
    $("#correct").text(correctCounter);
    $("#incorrect").text(incorrectCounter);
    $(".end").css("display","inline");
    $(".begin").css("display","none");
    $("#start").css("display","inline");
    $("#finish").css("display","none");

}
function evaluate(){
    var id = $(this).prop("id");
    console.log("evaluate name:"+ name+"  id:"+id+"  length:"+id.length);
    var parts = id.split("-");
    var q = parseInt(parts[0].substr(1,parts[0].length),10);
    var a = parseInt(parts[1].substr(1,parts[1].length),10);
    console.log(parts+"  q:"+q+"  a:"+a);
    userAnswers[q] = a;
    console.log(userAnswers);
}

/**
*   method iterates all trivia game questions and for each iteration, loads
*   values from a data sheet, dynamically creates a row for each question and
*   set of answers for each queston.
*/
function showQuestions() {
    console.log("showQuestions");
    for(var i=0; i < gameQuestions.length; i++){
        var currentQuestion = gameQuestions[i];
        this.trivia.loadData(currentQuestion);
        console.log("obj: "+JSON.stringify(this.trivia));
        correctAnswers.push(this.trivia.idxOfCorrectAnswer);
        //initialize user answers to -1
        userAnswers.push(-1);
        //question row
        var q = getQuestionRow(i);
        //answer row
        var a = getAnswerRow(i);
        var hr = $("<hr>");
       

        $("#question-view").append(q, a, hr);
    }
}
/**
*   Presents a dynamic row for each question
*/
function getQuestionRow(idx) {
    var row = $("<div>").addClass("row");
    var col = $("<div>").addClass("col-md-12");
    var q = $("<h4>").text(idx+1 +". "+this.trivia.question);
    col.append(q);
    row.append(col);
    return row;
}
/**
*   Presents a dynamic row for each answer
*/
function getAnswerRow(idx) { 
    // console.log("showAnswerRow idx:"+idx);
    var row = $("<div>").addClass("row");
    var col = $("<div>").addClass("col-md-12");
    for(var j=0; j<this.trivia.answers.length;j++){
        var rbdiv = createRadioButton(this.trivia.answers[j],idx,j);
        col.append(rbdiv);
    }
    row.append(col);
    console.log(row.html());
    return row;
    
}

/*
*   Object to hold each question-answer set combination
*/
var trivia = {
    question : "",
    answers : [],
    idxOfCorrectAnswer  : -1,
    loadData: function(question) {
        console.log("obj.loadData");
        this.question = question[0];
        this.answers = question[1];
        this.idxOfCorrectAnswer = question[2];
        return question;
    }
}
/*
*   function creates a dynamic row for each answer set, horizontally.
*   responsible for creating names and id for radio buttons
*/
function createRadioButton(str, idx, id) {
    console.log("createRadioButton  str:"+str+"  idx:"+idx);
    var lbl = $("<label>").addClass("radio-inline spacer").text(str);
    var name = "Q"+idx;
    var tempId = "q"+idx+"-a"+id;
    var rb = $("<input>").addClass("answerInput")
                .attr({
                    "type":"radio",
                    "id":tempId,
                    "name":name
                 });
    lbl.prepend(rb);

    return lbl;
}
//  start();  
