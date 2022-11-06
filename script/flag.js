// document.addEventListener("DOMContentLoaded", () => {
//   let unicycle = new UnicycleRangeSlider("#unicycle1");
//   console.log("test");
// });

// функция 1: эта функция забирает данные с сервера
async function getDataFromServer() {
  const response = await fetch("http://localhost:3001/data");
  const data = await response.json();
  // console.log(data);
  // console.log(data[0].posts[1].time);
  // console.log(data[1].posts[0].time);
  return data;
}

// функция 2: эта функция проводит калькуляцию значений времени
function getTotalHours(data) {  
  let totalSeconds = 0;
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    for (let j = 0; j < item.posts.length; j++) {
      let post = item.posts[j];
      let timeParts = post.time.split(":");
      let hours = Number(timeParts[0]);
      let minutes = Number(timeParts[1]);
      let seconds = Number(timeParts[2]);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    }
  }
  // console.log(totalSeconds);
  return Math.round(totalSeconds / 3600);
}



// функция 3: эта функция выводит значение на UI
function updateUIControls(totalHours) {
  // ничего не возвращает
  let inputWheel = document.querySelector(`#unicycle1 input[type=range]`);
  inputWheel.value = totalHours;
  let unicycle = new UnicycleRangeSlider("#unicycle1");
}  

// функция 4
export async function displayTimeStatistics() {
  let data = await getDataFromServer();
  let totalHours = getTotalHours(data);
  updateUIControls(totalHours);
}

class UnicycleRangeSlider {
  constructor(el) {
    this.wheel = document.querySelector(`${el} input[type=range]`);
    this.marker = document.querySelector(`${el} .unicycle__marker`);
    this.flag = document.querySelector(`${el} .unicycle__flag`);

    this.updateBodyPos();
  }
  updateBodyPos() {
    let max = this.wheel.max,
      min = this.wheel.min,
      realValue = this.wheel.value,
      ticks = max - min,
      relValue = realValue - min,
      percent = relValue / ticks,
      revs = 1,
      left = percent * 100,
      emAdjust = percent * 1.5,
      pedalRot = percent * (360 * revs),
      period = (1 / (ticks / revs / 2)) * relValue * Math.PI,
      rightLegRot = -22.5 * Math.sin(period + 1.85 * Math.PI) - 22.5,
      rightLowerLegRot = 45 * Math.sin(period + 0 * Math.PI) + 45,
      leftLegRot = -22.5 * Math.sin(period + 2.85 * Math.PI) - 22.5,
      leftLowerLegRot = 45 * Math.sin(period + 1 * Math.PI) + 45,
      cssVars = {
        "--pedalRot": `${pedalRot}deg`,
        "--rightLegRot": `${rightLegRot}deg`,
        "--rightLowerLegRot": `${rightLowerLegRot}deg`,
        "--leftLegRot": `${leftLegRot}deg`,
        "--leftLowerLegRot": `${leftLowerLegRot}deg`,
      };
    // position stick figure and unicycle body
    this.marker.style.left = `calc(${left}% - ${emAdjust}em)`;
    // update the variables in CSS
    for (let v in cssVars) this.marker.style.setProperty(v, cssVars[v]);
    // number in the flag
    this.flag.innerHTML = realValue;
  }
}
