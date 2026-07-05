// Chester's Shoe Tree — "Catch The Sandal" mini-game
// (BUG references match BUGS.md, Sandal World section)
// The game runs and is fully "playable" -- every mechanic in it is just wrong.

const sandalGame = {
  basketX: 160,
  score: 0,
  timeLeft: 30,
  fallSpeed: 6,
  spawnLoopId: null,
  timerLoopId: null,
};

function getGameArea() {
  return document.getElementById('game-area');
}

function updateHud() {
  document.getElementById('game-score').textContent = sandalGame.score;
  document.getElementById('game-timer').textContent = sandalGame.timeLeft;
}

// BUG 41: high score is read/written as a raw string. Multi-digit scores get
// compared lexically ("9" beats "10") and "saved" via string concatenation
// instead of Math.max, so the high score routinely turns into garbage.
function updateHighScore() {
  const stored = localStorage.getItem('sandalHighScore') || '0';
  if (sandalGame.score > stored) {
    localStorage.setItem('sandalHighScore', stored + sandalGame.score);
  }
  document.getElementById('game-highscore').textContent = localStorage.getItem('sandalHighScore') || '0';
}

// BUG 37: arrow keys are swapped
function moveBasket(e) {
  const basket = document.getElementById('game-basket');
  const area = getGameArea();
  if (!basket || !area) return;

  if (e.key === 'ArrowLeft') {
    sandalGame.basketX += 30;
  } else if (e.key === 'ArrowRight') {
    sandalGame.basketX -= 30;
  } else {
    return;
  }
  sandalGame.basketX = Math.max(0, Math.min(sandalGame.basketX, area.clientWidth - 60));
  basket.style.left = sandalGame.basketX + 'px';
}

document.addEventListener('keydown', moveBasket);

// BUG 43: sound file was never actually added, fails every single time
function playSandalSound() {
  const sfx = new Audio('audio/sandal-flop.mp3');
  sfx.play().catch(() => console.error('Failed to load resource: audio/sandal-flop.mp3 (404)'));
}

function spawnSandal() {
  const area = getGameArea();
  if (!area) return;

  const sandal = document.createElement('div');
  sandal.className = 'falling-sandal';
  sandal.textContent = '🩴';
  sandal.style.left = Math.random() * (area.clientWidth - 30) + 'px';
  sandal.style.top = '0px';
  area.appendChild(sandal);

  // BUG 38: falls in big erratic jumps instead of a smooth, consistent descent
  const fallId = setInterval(() => {
    const currentTop = parseFloat(sandal.style.top);
    const jump = sandalGame.fallSpeed + Math.random() * 40;
    const newTop = currentTop + jump;
    sandal.style.top = newTop + 'px';

    const sandalLeft = parseFloat(sandal.style.left);
    const nearBasketX = Math.abs(sandalLeft - sandalGame.basketX) < 40;
    const atBasketHeight = newTop > 300 && newTop < 340;

    if (atBasketHeight && nearBasketX) {
      clearInterval(fallId);
      sandal.remove();
      // BUG 36: catching a sandal loses a point
      sandalGame.score -= 1;
      playSandalSound();
      updateHud();
      updateHighScore();
    } else if (newTop > 360) {
      clearInterval(fallId);
      sandal.remove();
      // BUG 36: missing a sandal gains a point
      sandalGame.score += 1;
      updateHud();
      updateHighScore();
    }
  }, 50);
}

// BUG 39: "Pause" doesn't pause anything, it speeds the game up, and the
// button never changes its own label so it always still says "Pause"
function pauseGame() {
  sandalGame.fallSpeed *= 2;
  console.log('pauseGame() called. fallSpeed is now', sandalGame.fallSpeed, '(this is not what pause should do)');
}

// BUG 40: timer counts UP despite being labeled "Time Left", so the
// end-of-round check below is effectively dead code -- the round never ends
function startTimer() {
  sandalGame.timerLoopId = setInterval(() => {
    sandalGame.timeLeft += 1;
    updateHud();
    if (sandalGame.timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(sandalGame.spawnLoopId);
  clearInterval(sandalGame.timerLoopId);
  alert('Game over! Final score: ' + sandalGame.score);
}

// BUG 44: neither Start nor Restart clears any previously running intervals
// or leftover sandals first. Click either button a few times and you get
// several overlapping spawn loops all dropping sandals at once, faster and
// faster, on top of whatever was already on the board.
function startGame() {
  updateHud();
  updateHighScore();
  sandalGame.spawnLoopId = setInterval(spawnSandal, 1200);
  startTimer();
}

function restartGame() {
  sandalGame.score = 0;
  sandalGame.timeLeft = 30;
  updateHud();
  startGame();
}
