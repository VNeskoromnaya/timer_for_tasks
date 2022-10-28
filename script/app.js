// const moment = require('moment');
// const chart = require('chart.js');

import {getAPI} from './script.js';
import {getTodayDate} from './script.js';
import {getHistory} from './script.js';

getAPI();
getTodayDate();
getHistory();

console.log('hello');
