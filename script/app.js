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
import { displayTimeStatistics } from "./flag";

document.addEventListener("DOMContentLoaded", () => {
  console.log("test");
  displayTimeStatistics();
});
import { onWorkStart, onWorkStop } from './workBreaks.js';
import { drawWorkTimeChart } from './workChart.js';

const chartDiv = document.getElementById('myChart');
drawWorkTimeChart(chartDiv);

const startButton = document.querySelector('.btn-start');
startButton.addEventListener('click', onWorkStart);

const finishButton = document.querySelector('.btn-finish');
finishButton.addEventListener('click', onWorkStop);
