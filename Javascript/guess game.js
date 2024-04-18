/**
 * This version is for web browsers 
 * It won't work on your IDE terminal or out put section
 * In your browser, it would display as a pop up panel.
 */


// Define the sarcastic/quirky messages
const sarcasticMessages = [
  "Wow, you're really bad at this!",
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

  while (attemptsLeft > 0) {
    const guess = parseInt(
      prompt(
        `Guess a number between 0 and 100 (Attempts left: ${attemptsLeft}): `
      )
    );

    if (isNaN(guess)) {
      alert("Invalid input. Please enter a number.");
      continue;
    }

    if (guess === hiddenNumber) {
      alert(
        `${
          congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
        }`
      );
      break;
    } else if (guess < hiddenNumber) {
      alert("Too low!");
    } else {
      alert("Too high!");
    }

    attemptsLeft--;
  }

  if (attemptsLeft === 0) {
    alert(
      `${
        sarcasticMessages[Math.floor(Math.random() * sarcasticMessages.length)]
      }\nThe hidden number was ${hiddenNumber}.`
    );
  }
}

// Start the game
playGame();
