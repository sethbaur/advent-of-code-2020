const { getData } = require('../shared/getData');
let data = getData('./input.txt');

const shuttles = data[1].split(',').map(s => s !== 'x' ? parseInt(s) : false);
let found;
let current = shuttles[0];
const increment = shuttles[0];
shuttles.shift();

const start = 100000000000000;
// const start = 100000;
const multiplier = Math.ceil(start, current);
current *= multiplier;

while (!found) {
  found = true;
  forLoop:
  for (let index = 0; index < shuttles.length; index++) {
    shuttle = shuttles[index];
    if (shuttle) {
      const target = current + index + 1;
      if (target % shuttle !== 0) {
        found = false;
        break forLoop;
      }
    }
  }

  if (found) {
    console.log(current);
  }
  current += increment;
}

