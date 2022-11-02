import moment from 'moment';
window.moment = moment;
const chart = require('chart.js');

import { onWorkStart, onWorkStop } from './workBreaks.js';
import { drawWorkTimeChart } from './workChart.js';

drawWorkTimeChart(document.getElementById('myChart'));

let buttonStart = document.querySelector('.btn');
buttonStart.addEventListener('click', onWorkStart);

let buttonFinish = document.querySelector('.btn-finish');
buttonFinish.addEventListener('click', onWorkStop);

