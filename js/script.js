const guessedLettersElement = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

// Collects a word from the ASYNC
const getWord = async function() {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    // console.log(data);
    
    const wordArray = data.split("n");
    // console.log(wordArray);
    
    // pull a random word
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex]
    word = randomWord.trim();
    placeHolder(word);
};
getWord();

// What it will look like at the start
const placeHolder = function(){
    const placeHolderLetters = [];
    for (const letter of word){
        console.log(word);
        placeHolderLetters.push("*");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};


// Guess button
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

// Check if input is only one letter
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

// Adds the guess to the array of guessed letters
const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `Oops, you've already guessed that letter!`;
    } else {
        guessedLetters.push(guess);
        guessesRemaining(guess);
        alreadyGuessed();
        updateWordInProgress(guessedLetters);
    }
    console.log(guessedLetters);
};

// to show the letters already guessed
const alreadyGuessed = function() {
    guessedLettersElement.innerHTML = "";
    for (const letters of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letters;
        guessedLettersElement.append(li);
    }
};

// to update the word in progress
const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const updatedCharacters = [];

    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
        updatedCharacters.push(letter.toUpperCase());
        //wordInProgress.join(updatedCharacters);
        updatedCharacters.join(wordInProgress);
        } else {
            updatedCharacters.push("*");
        }
    }
    wordInProgress.innerText = updatedCharacters.join("");
    playerWin();
};

// Calculate your remaining guesses
const guessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word doesn't have ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes, a ${guess}! Keep going!`;
    }

    if (remainingGuesses === 0) {
        message.innerText = `Game Over. the word was ${word.toUpperCase()}`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `1 guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


// When player has won!
const playerWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};