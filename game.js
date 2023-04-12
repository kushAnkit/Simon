var arr = ["red", "blue", "green", "yellow"];
userClickedPattern = [];
gamePattern = [];
started = false;
var level = 0;
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("LeveL " + level);
    nextSequence();
    started = true;
  }
});
$(document).click(function () {
  if (!started) {
    $("#level-title").text("LeveL " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("LeveL " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = arr[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] == userClickedPattern[currentIndex]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 200);
    }
  } else {
    $("h1").text("Game Over,Press Any key to restart");
    playSound("wrong");
    $("body").addClass("game-over");
    startOver();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }

}

function playSound(currentColor) {
  var audio = new Audio("sounds/" + currentColor + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("presssed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}


function startOver() {
  level = 0;
  started = false;
  gamePattern = [];

}