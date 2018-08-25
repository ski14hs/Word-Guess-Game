

//Start with some variable to keep track of counters and element objects
var winDiv = document.getElementById("win-counter");
var lossDiv = document.getElementById("loss-counter");
var guessDiv = document.getElementById("wrong-guesses");
var guessRemainDiv = document.getElementById("guesses-left");
var blanks = document.getElementById("word-blanks");

var winCount = 0;
var lossCount = 0;

var guessCount = 0;

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var words = ["doorway", "shelf", "glass", "picture", "towel", "water", "knife", "novel", "flower", "lightbulb", "recipe", "candle", "package", "internet", "painting", "table", "television", "lamp", "switch", "books", "fan", "sofa", "carpet", "window" ];
var word = words[Math.floor(Math.random()*words.length)];
//randomly select word and set up blank divs
function blanksGenerate(length){
    var holder = "";
    for(var i = 0; i < length; i++){
        holder = holder + " _";
    }
    return holder;
}

blanks.textContent= blanksGenerate(word.length);

//Track guesses
var guesses = [];
var currentProgress = [];
var enteredChar = [];

var guess;

document.onkeyup = function(event) {
    guess = event.key;
    if (enteredChar.indexOf(guess) === -1){
        //not entered
        enteredChar.push(guess);
    
    

        //if guess isn't option 
        if (word.indexOf(guess) === -1){
            guessCount++;
            guesses.push(guess);
            guessDiv.textContent = guesses;
            guessRemainDiv.textContent = 9-guessCount;
            if (guessCount > 9){
                //Lose condition
                lossCount++;
                lossDiv.textContent = lossCount;
                var restart = confirm("Aww, you lose. The word was " + word + ", start again?");
                if(restart){
                    //reset values
                    guessCount = 0;
                    guesses = [];
                    currentProgress = [];
                    enteredChar = [];
                    guessDiv.textContent="";
                    guessRemainDiv.textContent = 9;
                    //Choose new word
                    word = words[Math.floor(Math.random()*words.length)];
                    blanks.textContent= blanksGenerate(word.length);
                }

            }
        }
        else {
            //guess is part of word
            //find values in word
            for(var i = 0; i < word.length; i++){
                if(word[i] === guess){
                    currentProgress.push(i);
                }
            }
            // push values to div
            var holder = "";
            for( var i = 0; i < word.length; i++){
                //loop through all characters of word
                if(currentProgress.indexOf(i) === -1){
                    //current not guesses append blank
                    holder = holder + " _";
                }else {
                    //value is guessed
                    holder = holder + word[i];
                }
            }
            blanks.innerText = holder;
            
            
            if (currentProgress.length >= word.length){
                //win
                winCount++;
                winDiv.textContent = winCount;
                var restart = confirm("Congratulations! You win! Play again?");
                if (restart){
                    //reset
                    guessCount = 0;
                    guesses = [];
                    currentProgress = [];
                    enteredChar = [];
                    guessDiv.textContent="";
                    guessRemainDiv.textContent = 9;
                    //Choose new word
                    word = words[Math.floor(Math.random()*words.length)];
                    blanks.textContent= blanksGenerate(word.length);
                }
            }
        }
    } else {
        //already attempted

    }
  };