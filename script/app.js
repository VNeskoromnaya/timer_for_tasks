import moment from 'moment';
window.moment = moment;
const chart = require('chart.js');

import { mainFunction, drawWorkTimeChart } from './script.js'

drawWorkTimeChart(document.getElementById('myChart'));
