const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const map = data.map(line => line.split(''));
let trees = 0;
let position = 0;
const width = map[0].length;

for (const [i, row] of map.entries()) {
  if (!map[i+1]) continue;
  position = (position + 3) % width;
  if (map[i+1][position] === '#') trees++;
}

console.log(trees);
