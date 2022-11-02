import moment from "moment";
window.moment = moment;
const chart = require("chart.js");

import { displayTimeStatistics } from "./flag";

document.addEventListener("DOMContentLoaded", () => {
  let unicycle = new UnicycleRangeSlider("#unicycle1");
  console.log("test");
  displayTimeStatistics();
});
