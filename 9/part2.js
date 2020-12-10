const { getData } = require('../shared/getData');
const { getNumber } = require('./getNumber');

let data = getData('./input.txt');
data = data.map(num => parseInt(num));
let number = getNumber();

const sum = (size, start) => {
  const slice = data.slice(start, start + size);
  return slice.reduce((acc, cur) => acc += cur, 0);
};

const getAnswer = (size, start) => {
  const slice = data.slice(start, start + size).sort((a, b) => a - b);
  return slice.shift() + slice.pop();
}

for (let size = data.length - 1; size >= 2; size--) {
  let index = 0;
  while (index + size < data.length) {
    if (sum(size, index) === number) {
      console.log(getAnswer(size, index));
    }
    index++;
  }
}
