import {
    start,
    pause,
    reset
} from './timer.js';
import {
    save
} from './saveData.js';

const buttonStart = document.querySelector('.start');
buttonStart.addEventListener('click', start);

// function startWork() {
//     start();
//     onWorkStart();
//     drawWorkTimeChart();
// }

const buttonPause = document.querySelector('.pause');
buttonPause.addEventListener('click', pause);

const buttonReset = document.querySelector('.reset');
buttonReset.addEventListener('click', reset);

const buttonSave = document.querySelector('.save');
buttonSave.addEventListener('click', save);

// const buttonFinish = document.querySelector('.end-of-work');
// buttonFinish.addEventListener('click', onWorkStop);