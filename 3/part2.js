const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const map = data.map(line => line.split(''));
const width = map[0].length;

const calculateTrees = (right, down) => {
  let trees = 0;
  let xPosition = 0;
  let yPosition = 0;

  while (yPosition <= map.length) {
    if (!map[yPosition+down]) break;
    xPosition = (xPosition + right) % width;
    yPosition += down;
    if (map[yPosition][xPosition] === '#') trees++;
  }
  return trees;
}

const answer = [[1,1], [3,1], [5,1], [7,1], [1,2]].reduce((acc, curr) => {
  const [right, down] = curr;
  const trees = calculateTrees(right, down);
  if (!acc) return trees
  return acc *= trees;
}, 0);

console.log(answer);
