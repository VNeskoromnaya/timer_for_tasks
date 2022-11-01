// import { bodyParser } from 'json-server';
import moment from 'moment';
window.moment = moment;
const chart = require('chart.js');

import { drawWorkTimeChart, onWorkStart, onWorkStop, showBreakNotification, clearInterval } from './script.js'

drawWorkTimeChart(document.getElementById('myChart'));

let button = document.querySelector('.btn');
button.addEventListener('click', onWorkStart);

let buttonFinish = document.querySelector('.btn-finish');
buttonFinish.addEventListener('click', onWorkStop);
