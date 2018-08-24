

//Start with some variable to keep track of counters and element objects
var winDiv = document.getElementById("win-counter");
var lossDiv = document.getElementById("loss-counter");
var guessDiv = document.getElementById("wrong-guesses");
var guessRemainDiv = document.getElementById("guesses-left");

var winCount = 0;
var lossCount = 0;

var guessCount = 0;

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var word = "Enter";
//Track guesses
var guesses = [];

var guess;

document.onkeyup = function(event) {
    guess = event.key;
    // guesses.push(guess);
    // alert(guesses);
    //if guess isn't option 
    if (word.indexOf(guess) === -1){
        guessCount++;
        guesses.push(guess);
        guessDiv.textContent = guesses;
        guessRemainDiv.textContent = 9-guessCount;
    }
  };