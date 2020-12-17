const { getData } = require('../shared/getData');
let data = getData('./sample.txt');

const earliestTime = parseInt(data[0]);
const shuttles = data[1].split(',').filter(s => s !== 'x').map(s => parseInt(s));

let nextEarliestTime;
let nextShuttle;

for (const shuttle of shuttles) {
  const multiplier = Math.ceil(earliestTime, shuttle);
  const nextTime = shuttle * multiplier;
  if (!nextEarliestTime || nextTime < nextEarliestTime) {
    nextEarliestTime = nextTime;
    nextShuttle = shuttle;
  }
}

console.log(nextShuttle * (nextEarliestTime - earliestTime));
