const { getData } = require('../shared/getData');

let data = getData('./input.txt');

const directionRegex = /^([A-Z])([0-9]+)$/;
const compass = ['N', 'E', 'S', 'W'];
let facing = 'E';
let northSouth = 0;
let eastWest = 0;

const turn = (direction, degrees) => {
  const modifier = direction === 'R' ? 1 : -1;
  const turns = degrees / 90;
  for (let i = 0; i < turns; i++) {
    const facingIndex = compass.indexOf(facing);
    if (direction === 'L' && facingIndex === 0) {
      facing = compass[compass.length - 1];
    } else {
      facing = compass[(facingIndex + modifier) % compass.length];
    }
  }
}

const move = (direction, distance) => {
  if (direction === 'F') return move(facing, distance);
  const modifier = direction === 'S' || direction === 'W' ?
    -1 : 1;
  if (direction === 'N' || direction === 'S') {
    northSouth += distance * modifier;
  } else {
    eastWest += distance * modifier;
  }
};

for (const line of data) {
  const [, direction, degree] = line.match(directionRegex);
  if (direction === 'R' || direction === 'L') {
    turn(direction, parseInt(degree));
  } else {
    move(direction, parseInt(degree));
  }
}
console.log(Math.abs(northSouth) + Math.abs(eastWest));
