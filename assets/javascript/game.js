//Starting myGame object
var myGame = {
    //Divs to update
    winDiv: document.getElementById("win-counter"),
    lossDiv: document.getElementById("loss-counter"),
    guessDiv: document.getElementById("wrong-guesses"),
    guessRemainDiv: document.getElementById("guesses-left"),
    blanks: document.getElementById("word-blanks"),

    //Arrays for letters and words
    letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    words: ["doorway", "shelf", "glass", "picture", "towel", "water", "knife", "novel", "flower", "lightbulb", "recipe", "candle", "package", "internet", "painting", "table", "television", "lamp", "switch", "books", "fan", "sofa", "carpet", "window" ],

    //Counter variables
    winCount: 0,
    lossCount: 0,
    guessCount: 0,

    //Guess Variables
    guesses: [],
    currentProgress: [],
    enteredChar: [],
    // guess, //is this needed?

    //Functions
    //Select Random Word
    chooseWord: function(){
        return this.words[Math.floor(Math.random()*this.words.length)];
    },

    //set word value using above function
    // word: this.chooseWord(),

    //fill blanks div with blanks according to word
    blanksGenerate: function(length){
        var holder = "";
        for(var i = 0; i < length; i++){
            holder = holder + " _";
        }
        return holder;
    },

    //main key function
    keypress: function(guess){
        //first ignore invalid key presses (change true)
        guess = guess.toLowerCase();
        if (guess.length === 1 && guess >= 'a' && guess <= 'z'){
            //only take new inputs
            if (this.enteredChar.indexOf(guess) === -1){
                //not entered
                this.enteredChar.push(guess);
            
                //if guess isn't part of word 
                if (this.word.indexOf(guess) === -1){
                    this.guessCount++;
                    this.guesses.push(guess);
                    this.guessDiv.textContent = this.guesses;
                    this.guessRemainDiv.textContent = 9-this.guessCount;
                    if (this.guessCount > 9){
                        //Lose condition
                        this.lossCount++;
                        this.lossDiv.textContent = this.lossCount;
                        var restart = confirm("Aww, you lose. The word was " + this.word + ", start again?");
                        if(restart){
                            //reset values
                            this.guessCount = 0;
                            this.guesses = [];
                            this.currentProgress = [];
                            this.enteredChar = [];
                            this.guessDiv.textContent="";
                            this.guessRemainDiv.textContent = 9;
                            //Choose new word
                            this.word = this.words[Math.floor(Math.random()*this.words.length)];
                            this.blanks.textContent= this.blanksGenerate(this.word.length);
                        }
        
                    }
                }
                else {
                    //guess is part of word
                    //find values in word
                    for(var i = 0; i < this.word.length; i++){
                        if(this.word[i] === guess){
                            this.currentProgress.push(i);
                        }
                    }
                    // push values to div
                    var holder = "";
                    for( var i = 0; i < this.word.length; i++){
                        //loop through all characters of word
                        if(this.currentProgress.indexOf(i) === -1){
                            //current not guesses append blank
                            holder = holder + " _";
                        }else {
                            //value is guessed
                            holder = holder + this.word[i];
                        }
                    }
                    this.blanks.innerText = holder;
                    
                    
                    if (this.currentProgress.length >= this.word.length){
                        //win
                        this.winCount++;
                        this.winDiv.textContent = this.winCount;
                        var restart = confirm("Congratulations! You win! Play again?");
                        if (restart){
                            //reset
                            this.guessCount = 0;
                            this.guesses = [];
                            this.currentProgress = [];
                            this.enteredChar = [];
                            this.guessDiv.textContent="";
                            this.guessRemainDiv.textContent = 9;
                            //Choose new word
                            this.word = this.words[Math.floor(Math.random()*this.words.length)];
                            this.blanks.textContent= this.blanksGenerate(this.word.length);
                        }
                    }
                }
            } else {
                //already attempted
        
            }
        }
    } //end function keypress(guess)
}; // end Object myGame

// Event handler
myGame.word = myGame.chooseWord();
document.onkeyup = function(event) {
        // myGame.guess = event.key;
        myGame.keypress(event.key);

};


// //Beginning old not object style
// //Start with some variable to keep track of counters and element objects
// var winDiv = document.getElementById("win-counter");
// var lossDiv = document.getElementById("loss-counter");
// var guessDiv = document.getElementById("wrong-guesses");
// var guessRemainDiv = document.getElementById("guesses-left");
// var blanks = document.getElementById("word-blanks");

// var winCount = 0;
// var lossCount = 0;

// var guessCount = 0;

// var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// var words = ["doorway", "shelf", "glass", "picture", "towel", "water", "knife", "novel", "flower", "lightbulb", "recipe", "candle", "package", "internet", "painting", "table", "television", "lamp", "switch", "books", "fan", "sofa", "carpet", "window" ];
// var word = words[Math.floor(Math.random()*words.length)];
// //randomly select word and set up blank divs
// function blanksGenerate(length){
//     var holder = "";
//     for(var i = 0; i < length; i++){
//         holder = holder + " _";
//     }
//     return holder;
// }

// blanks.textContent= blanksGenerate(word.length);

// //Track guesses
// var guesses = [];
// var currentProgress = [];
// var enteredChar = [];

// var guess;

// document.onkeyup = function(event) {
//     guess = event.key;
//     if (enteredChar.indexOf(guess) === -1){
//         //not entered
//         enteredChar.push(guess);
    
    

//         //if guess isn't option 
//         if (word.indexOf(guess) === -1){
//             guessCount++;
//             guesses.push(guess);
//             guessDiv.textContent = guesses;
//             guessRemainDiv.textContent = 9-guessCount;
//             if (guessCount > 9){
//                 //Lose condition
//                 lossCount++;
//                 lossDiv.textContent = lossCount;
//                 var restart = confirm("Aww, you lose. The word was " + word + ", start again?");
//                 if(restart){
//                     //reset values
//                     guessCount = 0;
//                     guesses = [];
//                     currentProgress = [];
//                     enteredChar = [];
//                     guessDiv.textContent="";
//                     guessRemainDiv.textContent = 9;
//                     //Choose new word
//                     word = words[Math.floor(Math.random()*words.length)];
//                     blanks.textContent= blanksGenerate(word.length);
//                 }

//             }
//         }
//         else {
//             //guess is part of word
//             //find values in word
//             for(var i = 0; i < word.length; i++){
//                 if(word[i] === guess){
//                     currentProgress.push(i);
//                 }
//             }
//             // push values to div
//             var holder = "";
//             for( var i = 0; i < word.length; i++){
//                 //loop through all characters of word
//                 if(currentProgress.indexOf(i) === -1){
//                     //current not guesses append blank
//                     holder = holder + " _";
//                 }else {
//                     //value is guessed
//                     holder = holder + word[i];
//                 }
//             }
//             blanks.innerText = holder;
            
            
//             if (currentProgress.length >= word.length){
//                 //win
//                 winCount++;
//                 winDiv.textContent = winCount;
//                 var restart = confirm("Congratulations! You win! Play again?");
//                 if (restart){
//                     //reset
//                     guessCount = 0;
//                     guesses = [];
//                     currentProgress = [];
//                     enteredChar = [];
//                     guessDiv.textContent="";
//                     guessRemainDiv.textContent = 9;
//                     //Choose new word
//                     word = words[Math.floor(Math.random()*words.length)];
//                     blanks.textContent= blanksGenerate(word.length);
//                 }
//             }
//         }
//     } else {
//         //already attempted

//     }
//   };