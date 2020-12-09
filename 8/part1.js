const { getData } = require('../shared/getData');
const data = getData('./input.txt');

let pointer = 0;
let acc = 0;
const executedLines = [];

const instRegex = /^([\w]{3}) ([+|-]\d+)$/;

while (!executedLines.includes(pointer)) {
  const line = data[pointer];
  executedLines.push(pointer);
  const [, inst, increment] = line.match(instRegex);
  const number = parseInt(increment);
  switch (inst) {
    case 'acc':
      acc += number;
      pointer++;
      break;
    case 'jmp':
      pointer += number;
      break;
    default:
      pointer++;
  }
}

console.log(acc);
