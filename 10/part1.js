const { getData } = require('../shared/getData');

let data = getData('./input.txt');
data = data.map(num => parseInt(num)).sort((a, b) => a - b);
data.push(data[data.length - 1] + 3);

let lastJoltage = 0;
let oneDiff = 0;
let threeDiff = 0;

for (const adapter of data) {
  const diff = adapter - lastJoltage;
  if (diff === 1) oneDiff++;
  if (diff === 3) threeDiff++;
  lastJoltage = adapter;
}

console.log(oneDiff * threeDiff);
