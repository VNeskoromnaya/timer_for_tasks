// import { bodyParser } from 'json-server';
import moment from 'moment';
window.moment = moment;
const chart = require('chart.js');

import { drawWorkTimeChart, onWorkStart, onWorkStop } from './script.js'

drawWorkTimeChart(document.getElementById('myChart'));

let buttonStart = document.querySelector('.btn');
buttonStart.addEventListener('click', onWorkStart);

let buttonFinish = document.querySelector('.btn-finish');
buttonFinish.addEventListener('click', onWorkStop);
