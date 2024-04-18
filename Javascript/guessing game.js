/**
 *@Adejare_Adedayo
                  @dprince-03 (github)
`*
 * This version is not for web browsers 
 * It will work on your IDE terminal or output section
 *
 */


const readline = require("readline");

// Define the sarcastic/quirky messages
const sarcasticMessages = [
  "Wow, you're really a failure!",
  "Maybe counting isn't your strong suit?",
  "I thought this was supposed to be easy...",
  "Did you even try?",
  "You had one job!",
];

// Define the congratulatory messages
const congratsMessages = [
  "Nicely done! You're a natural!",
  "Impressive! You must be a math genius!",
  "Congratulations! You guessed it right!",
  "Great job! You're a master at this game!",
  "Well played! You're a true number wizard!",
];

function playGame() {
  // Generate a random number between 0 and 100
  const hiddenNumber = Math.floor(Math.random() * 101);
  let attemptsLeft = 3;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const getGuess = () => {
    return new Promise((resolve) => {
      rl.question(
        `Guess a number between 0 and 100 (Attempts left: ${attemptsLeft}): `,
        (guess) => resolve(guess)
      );
    });
  };

  const guessLoop = async () => {
    while (attemptsLeft > 0) {
      const guess = await getGuess();

      if (isNaN(guess)) {
        console.log("Invalid input. Please enter a number.");
        continue;
      }

      const numGuess = parseInt(guess);

      if (numGuess === hiddenNumber) {
        console.log(
          congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
        );
        break;
      } else if (numGuess < hiddenNumber) {
        console.log("Too low!");
      } else {
        console.log("Too high!");
      }

      attemptsLeft--;
    }

    if (attemptsLeft === 0) {
      console.log(
        `${
          sarcasticMessages[
            Math.floor(Math.random() * sarcasticMessages.length)
          ]
        }\nThe hidden number was ${hiddenNumber}.`
      );
    }

    rl.close();
  };

  guessLoop();
}

// Start the game
playGame();
