const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const win = document.querySelector('.win-lose-message');
const btn = document.querySelector('.btn');

let choice = true;
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 2, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let pickedCells = [];

let currentClass;
const hoverCell = function () {
  cells.forEach(cell => {
    cell.addEventListener('mouseenter', function () {
      if (choice && cell.innerHTML === '') {
        cell.classList.add('showX');
      }
    });
    cell.addEventListener('mouseleave', function () {
      if (choice && cell.innerHTML === '') {
        cell.classList.remove('showX');
      }
    });
  });
  cells.forEach(cell => {
    cell.addEventListener('mouseenter', function () {
      if (!choice && cell.innerHTML === '') {
        cell.classList.add('showO');
      }
    });
    cell.addEventListener('mouseleave', function () {
      if (!choice && cell.innerHTML === '') {
        cell.classList.remove('showO');
      }
    });
  });
};

const startGame = function () {
  cells.forEach((cell, id) => {
    cell.innerHTML = '';
    cell.classList.remove('x');
    cell.classList.remove('o');

    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
};

const handleClick = function (e) {
  let cell = e.target;

  if (choice) {
    cell.classList.add('x');
    cell.classList.remove('showX');
    cell.innerHTML = `<i class="fa-solid fa-x"></i>`;
    currentClass = 'x';
    if (checkWinn(currentClass)) {
      win.textContent = `${currentClass}'s WON! `;
      message.style.display = 'flex';
    } else if (checkDraw()) {
      win.textContent = `DRAW `;
      message.style.display = 'flex';
    }
    switchTurn();
    pickedCells.push(id);
    console.log(pickedCells);
  } else {
    cell.classList.add('o');
    cell.classList.remove('showO');
    cell.innerHTML = `<i class="fa-solid fa-o"></i>`;
    currentClass = 'o';
    if (checkWinn(currentClass)) {
      win.textContent = `${currentClass}'s WON! `;
      message.style.display = 'flex';
    } else if (checkDraw()) {
      win.textContent = `DRAW `;
      message.style.display = 'flex';
    }
    switchTurn();
    pickedCells.push(id);
    console.log(pickedCells);
  }
};

const checkWinn = function (currentClass) {
  //   console.log(currentClass);

  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
};
const checkDraw = function () {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
};

const showChoice = function (cell) {
  if (cell.innerHTML === '' && choice) console.log('X');
  else if (cell.innerHTML === '' && !choice) console.log('O');
};

const switchTurn = function () {
  choice = !choice;
};

btn.addEventListener('click', function () {
  pickedCells = [];
  currentClass = 'x';
  message.style.display = 'none';
  startGame();
});

const init = function () {
  hoverCell();
  startGame();
};

init();
