import moment from "moment";
window.moment = moment;
const chart = require("chart.js");

import {getAPI} from './script'
import {getTodayDate} from './script'
import {getHistory} from './script'

getAPI();
getTodayDate();
getHistory();

