import moment from "moment";
window.moment = moment;
const chart = require("chart.js");

import {getAPI} from './script'
import {getTodayDate} from './script'
import {getHistory} from './script'

getAPI();
getTodayDate();
getHistory();

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
