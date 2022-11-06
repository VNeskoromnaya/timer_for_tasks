import {
  start,
  pause,
  reset
} from './timer.js';
import {
  save
} from './saveData.js';
import {
  displayTimeStatistics
} from "./flag";
import {
  onWorkStart,
  onWorkStop
} from './workBreaks.js';
import {
  drawWorkTimeChart
} from './workChart.js';

import {
  getAPI
} from './getAPI';
import {
  getTodayDate
} from './getTodayDate';
import {
  getHistory
} from './getHistory';



document.addEventListener("DOMContentLoaded", () => {
  console.log("test");

  const chartDiv = document.getElementById('myChart');
  drawWorkTimeChart(chartDiv);

  const buttonStart = document.querySelector('.start');
  buttonStart.addEventListener('click', startWork);


  function startWork() {
    start();
    onWorkStart();
  }

  const buttonPause = document.querySelector('.pause');
  buttonPause.addEventListener('click', pause);

  const buttonReset = document.querySelector('.reset');
  buttonReset.addEventListener('click', reset);

  const buttonSave = document.querySelector('.save');
  buttonSave.addEventListener('click', save);

  const buttonFinish = document.querySelector('.end-of-work');
  buttonFinish.addEventListener('click', onWorkStop);

  // const chartDiv = document.getElementById('myChart');
  // drawWorkTimeChart(chartDiv);

  // const startButton = document.querySelector('.btn-start');
  // startButton.addEventListener('click', onWorkStart);

  // const finishButton = document.querySelector('.btn-finish');
  // finishButton.addEventListener('click', onWorkStop);

  displayTimeStatistics();

  getAPI();
  getTodayDate();
  getHistory();

});