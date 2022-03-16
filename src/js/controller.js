import model from './model.js';
import view from './view.js';

const controlHover = function () {
  console.log(1);
};

const init = function () {
  view.addHandlerHover(controlHover);
};

init();
