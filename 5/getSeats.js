const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const bisect = (min, max, side) => {
  const midPoint = (max+1 - min)/2;
  if (side === 'upper') {
    return [min + midPoint, max];
  }
  return [min, min + midPoint - 1];
};

const getSeat = (instructions, min, max, lowerInst) => {
  const lastInstruction = instructions.pop();
  for (const inst of instructions) {
    const side = inst === lowerInst ? 'lower' : 'upper';
    [min, max] = bisect(min, max, side);
  }
  if (lastInstruction === lowerInst) {
    return min;
  }
  return max;
};

const getSeats = () => {
  const seats = [];
  for (const pass of data) {
    const row = getSeat(pass.substring(0, 7).split(''), 0, 127, 'F');
    const column = getSeat(pass.substring(7).split(''), 0, 7, 'L');
    seats.push(row * 8 + column);
  }
  return seats;
};

exports.getSeats = getSeats;
