function rectangularCollision({ rectangle1, rectangle2 }) {
  // Check for collision between two rectangles
  return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
      rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  const displayTextElement = document.querySelector('#displayText');
  displayTextElement.style.display = 'flex';

  // Determine the winner based on health
  if (player.health === enemy.health) {
      displayTextElement.innerHTML = 'Tie';
  } else if (player.health > enemy.health) {
      displayTextElement.innerHTML = 'Player 1 Wins';
  } else {
      displayTextElement.innerHTML = 'Player 2 Wins';
  }

  // Show the rematch button and end game screen
  document.querySelector('#rematchButton').style.display = 'block';
  document.querySelector('#endGameScreen').style.display = 'flex';
}

let timer = 60;
let timerId;

function decreaseTimer() {
  if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000);
      timer--;
      document.querySelector('#timer').innerHTML = timer;
  }

  // Check if the timer has reached zero
  if (timer === 0) {
      determineWinner({ player, enemy, timerId });
  }
}

// Function to reset the timer
function resetTimer() {
  timer = 60;
  document.querySelector('#timer').innerHTML = timer;
}

// Function to start the timer
function startTimer() {
  resetTimer();
  decreaseTimer();
}

// Example usage
// Call startTimer() when the game starts
// startTimer();