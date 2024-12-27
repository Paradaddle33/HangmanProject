import prompt from "picoprompt";
import wordBank from "./word-bank.js";

// Hangman stages with markdown. This needs to show a physical body being hung.
const hangmanStages = [
  `
   #---#
       |
       |
       |
      ===`,
  `
   #---#
   O   |
       |
       |
      ===`,
  `
   #---#
   O   |
   |   |
       |
      ===`,
  `
   #---#
   O   |
  /|   |
       |
      ===`,
  `
   #---#
   O   |
  /|\\  |
       |
      ===`,
  `
   #---#
   O   |
  /|\\  |
  /    |
      ===`,
  `
   #---#
   X   |
  /|\\  |
  / \\  |
      ===`
];

const getRandomWord = () => {
  const index = Math.floor(Math.random() * wordBank.length);
  return wordBank[index];
};

const secretWord = getRandomWord();
let guessedCorrectly = false;
let incorrectGuesses = 0;
const maxIncorrectGuesses = hangmanStages.length - 1;
let guessedLetters = [];

console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

while (!guessedCorrectly && incorrectGuesses < maxIncorrectGuesses) {
  console.log(hangmanStages[incorrectGuesses]); // Print current hangman stage
  console.log("\nGuessed Letters: " + guessedLetters.join(", "));
  const displayWord = secretWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
  console.log(displayWord);

  const letter = prompt("Please guess a letter: ").toLowerCase();

  if (guessedLetters.includes(letter)) {
    console.log("You already guessed that letter. Try again.");
  } else if (!/^[a-z]$/.test(letter)) {
    console.log("Invalid input. Please enter a single letter.");
  } else {
    guessedLetters.push(letter);
    if (!secretWord.includes(letter)) {
      console.log("Incorrect guess.");
      incorrectGuesses++;
    }
    guessedCorrectly = secretWord.split("").every(letter => guessedLetters.includes(letter));
  }
}

if (guessedCorrectly) {
  console.log("Congratulations! You've guessed the word: " + secretWord);
} else {
  console.log(hangmanStages[incorrectGuesses]); // Print final hangman stage
  console.log("Game over! The correct word was: " + secretWord);
}
