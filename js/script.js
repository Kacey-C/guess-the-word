const guessedLettersElement = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeHolder = function(){
    const placeHolderLetters = [];
    for (const letter of word){
        console.log(word);
        placeHolderLetters.push("&bull;");
    }
    wordInProgress.innerHTML = placeHolderLetters.join("");
};

placeHolder(word);

buttonGuess.addEventListener("click", function(e){
    e.preventDefault();
    const guess = textInput.value;
    //console.log(guess);
    textInput.value = "";

    //clear the message box
    message.innerText = "";

    //check that the input is a good guess
    const goodGuess = checkInput(guess);
    if (goodGuess){
      //  return guess;
        makeGuess(guess);
        alreadyGuessed();
    }

});

const checkInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        message.innerText = `Please enter a letter for your guess`;
    } else if (input.length > 1) {
        message.innerText = `Oops, only enter one letter!`;
    } else if (!input.match(acceptedLetter)) {
        message.innerText = `Oops, make sure you enter a letter!`;
    } else {
        return input;
    }
};


const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `Oops, you've already guessed that letter!`;
    } else {
        guessedLetters.push(guess);
    }
    console.log(guessedLetters);
};

const alreadyGuessed = function() {
    guessedLettersElement.innerHTML = "";
    for (const letters of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letters;
        guessedLettersElement.append(li);
    }
};