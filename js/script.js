const guessedLetters = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

const word = "magnolia";

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
    console.log(guess);
    textInput.value = "";
});