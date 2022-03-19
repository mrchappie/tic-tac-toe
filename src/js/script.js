const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const win = document.querySelector('.win-lose-message');
const btnRestart = document.getElementById('restart');
const btnReset = document.getElementById('reset');

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

const ASTRONAUT_CLS = 'astronaut';
const ALIEN_CLS = 'alien';

let choice = true;
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentClass = ASTRONAUT_CLS;

// HOVER EVENT LISTENER TO DISPLAY CHOICE IN THE HOVERED CELL
const hoverCell = function () {
  cells.forEach(cell => {
    cell.addEventListener('mouseenter', function () {
      showChoice(cell);
    });
    cell.addEventListener('mouseleave', function () {
      removeChoice(cell);
    });
  });
};

// START GAME
const startGame = function () {
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove(ASTRONAUT_CLS);
    cell.classList.remove(ALIEN_CLS);

    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
};

// INSERT CHOICE
const handleClick = function (e) {
  let cell = e.target;

  if (choice) {
    cell.classList.add(ASTRONAUT_CLS);
    cell.classList.remove('showX');
    cell.innerHTML = `<div class="img-p1"></div>`;
    // cell.innerHTML = `<i class="fa-solid fa-user-astronaut"></i>`;
    // cell.innerHTML = `<i class="fa-solid fa-x"></i>`;
    currentClass = ASTRONAUT_CLS;
    if (checkWinn(currentClass)) {
      endGame(true);
    } else if (checkDraw()) {
      endGame(false);
    }
    switchTurn();
  } else {
    cell.classList.add(ALIEN_CLS);
    cell.classList.remove('showO');
    cell.innerHTML = `<div class="img-p2"></div>`;
    // cell.innerHTML = `<i class="fa-solid fa-user"></i>`;
    // cell.innerHTML = `<i class="fa-solid fa-o"></i>`;
    currentClass = ALIEN_CLS;
    if (checkWinn(currentClass)) {
      endGame(true);
    } else if (checkDraw()) {
      endGame(false);
    }
    switchTurn();
  }
};

// CHECK FOR WINN
const checkWinn = function (currentClass) {
  //   console.log(currentClass);

  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

// CHECK FOR DRAW
const checkDraw = function () {
  return [...cells].every(cell => {
    return (
      cell.classList.contains(ASTRONAUT_CLS) ||
      cell.classList.contains(ALIEN_CLS)
    );
  });
};

// SHOW DISPLAYED CHOICE
const showChoice = function (cell) {
  if (cell.innerHTML === '' && choice) {
    cell.classList.add('showX');
  } else if (cell.innerHTML === '' && !choice) {
    cell.classList.add('showO');
  }
};

//  REMOVE DISPLAYED CHOICE
const removeChoice = function (cell) {
  if (cell.innerHTML === '' && choice) {
    cell.classList.remove('showX');
  } else if (cell.innerHTML === '' && !choice) {
    cell.classList.remove('showO');
  }
};

// SWITCH PLAYER TURN
const switchTurn = function () {
  choice = !choice;
};

// END GAME
const endGame = function (event) {
  if (event) {
    win.textContent = `${currentClass} WON! `;
    message.style.display = 'flex';
    currentClass === ASTRONAUT_CLS
      ? player1.textContent++
      : player2.textContent++;
  } else {
    win.textContent = `DRAW!`;
    message.style.display = 'flex';
  }
};

// PLAY AGAIN
btnRestart.addEventListener('click', function () {
  currentClass = ASTRONAUT_CLS;
  message.style.display = 'none';
  startGame();
});

// RESET GAME
btnReset.addEventListener('click', function () {
  currentClass = ASTRONAUT_CLS;
  player1.textContent = 0;
  player2.textContent = 0;
  startGame();
});

// INITIALIZATION FUNCTION
const init = function () {
  hoverCell();
  startGame();
};

init();
