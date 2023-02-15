var buttonColors = ["red","blue","green","yellow"];
var gamePattern =[];
var userClickedpattern=[];
var level=0;
var state = false;

$(document).keydown(function(){
    if(state == false){
        $("#level-title").text("Level "+level);
        nextSequence();
        state = true;
    }
});

$(".btn").click(function(){
    var userChosencolor = $(this).attr("id");
    userClickedpattern.push(userChosencolor);
    console.log(userClickedpattern);
    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer(userClickedpattern.length-1);
});

function checkAnswer(currlevel){
    if(userClickedpattern[currlevel] === gamePattern[currlevel]){
        if(userClickedpattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any key");
        startOver();

    }
}
function startOver(){
    level = 0;
    gamePattern=[];
    state = false;
}
function playSound(name){
    var audio  = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function nextSequence(){
    userClickedpattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*3)+1;
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#" +  randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);

}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}