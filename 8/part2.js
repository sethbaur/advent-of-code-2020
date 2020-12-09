const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const instRegex = /^([\w]{3}) ([+|-]\d+)$/;

const executeInstruction = (line, startPointer, startAcc) => {
  let pointer = startPointer;
  let acc = startAcc;
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
  return [pointer, acc];
}

const execute = (startLine, startPointer, startAcc) => {
  let pointer = startPointer;
  let acc = startAcc;
  const executedLines = [];
  let started = false;

  while (!executedLines.includes(pointer) && data[pointer]) {
    const line = started ? data[pointer] : startLine;
    started = true;
    executedLines.push(pointer);
    [pointer, acc] = executeInstruction(line, pointer, acc);
  }

  return executedLines.includes(pointer) ? undefined : acc;
}

const main = () => {
  let pointer = 0;
  let acc = 0;

  while (data[pointer]) {
    const line = data[pointer];
    const inst = line.match(instRegex)[1];
    if (inst === 'nop' || inst === 'jmp') {
      const opposite = inst === 'nop' ? 'jmp' : 'nop';
      const oppositePath = execute(line.replace(inst, opposite), pointer, acc);

      if (oppositePath) return oppositePath;
    }
    [pointer, acc] = executeInstruction(line, pointer, acc);
  }
}

console.log(main());
