import {start, pause, reset} from './stopwatch.js';
import {save} from './saveData.js';

const buttonStart = document.querySelector('.start');
buttonStart.addEventListener('click', start);

const buttonPause = document.querySelector('.pause');
buttonPause.addEventListener('click', pause);

const buttonReset = document.querySelector('.reset');
buttonReset.addEventListener('click', reset);

const buttonSave = document.querySelector('.save');
buttonSave.addEventListener('click', save);




