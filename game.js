// alert("Hello");

// Empty Array
var gamePattern = [];

// Array of colors
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;
var level = 0;

// start the game when the key is pressed
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});


// function
//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    // console.log(userClickedPattern);
    playSound(userChosenColour);

    // for adding and removing a class
    animatePress(userChosenColour);

    // passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // alert("Success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // alert("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        //changing h1
        $("#level-title").text("Game Over, Press any key to Restart");

        startOver();
    }
}


function nextSequence() {
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    
    // updating h1
    $("#level-title").text("Level " + level);
    
    
    // var n = 3
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    // alert(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    // alert(randomChosenColour);
    
    // adding element into an array
    gamePattern.push(randomChosenColour);
    
    //1. Use jQuery to select the button with the same id as the randomChosenColour
    //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();

    playSound(randomChosenColour);
}

function playSound(name) {
    // animatePress(name);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    // $("#" + currentColor).addClass("pressed").delay(100).removeClass("pressed");

    // removing a class after some delay
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// $("input").keypress(function(event) {
//     // alert(event.key);
//     nextSequence();
// })