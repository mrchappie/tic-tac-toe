import * as model from './model.js';

class ticTacToe {
  cells = document.querySelectorAll('.cell');

  turn = true;

  addHandlerHover(handler) {
    this.cells.forEach((cell, idx) =>
      cell.addEventListener('mouseover', function () {
        if (this.turn) {
          cell.innerHTML = '<i class="fa-solid fa-x"></i>';
        } else {
          console.log('Cell is empty!');
        }
      })
    );
  }
}

export default new ticTacToe();
