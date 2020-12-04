const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const regex = /^(\d+)-(\d+)\s(.):\s(.*)/;
let valid = 0;

for (const line of data) {
  const [, x, y, char, password] = line.match(regex);
  const first = parseInt(x) - 1;
  const second = parseInt(y) - 1;

  if (password[first] === char ^ password[second] === char) {
    valid++;
  }
}

console.log(valid);
