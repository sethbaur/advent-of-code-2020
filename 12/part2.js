const { getData } = require('../shared/getData');

let data = getData('./input.txt');

const directionRegex = /^([A-Z])([0-9]+)$/;
const ship = {
  northSouth: 0,
  eastWest: 0,
};
const waypoint = {
  northSouth: 1,
  eastWest: 10,
};

const setWaypoint = (ew, ns) => {
  waypoint.northSouth = ns;
  waypoint.eastWest = ew;
};

const turn = (direction, degrees) => {
  const turnRight = direction === 'R' ? true : false;
  const turns = degrees / 90;
  for (let i = 0; i < turns; i++) {
    const { northSouth, eastWest } = waypoint;
    if (turnRight) {
      setWaypoint(northSouth, -eastWest);
    } else {
      setWaypoint(-northSouth, eastWest);
    }
  }
}

const move = (direction, distance) => {
  const modifier = direction === 'S' || direction === 'W' ?
    -1 : 1;
  if (direction === 'N' || direction === 'S') {
    waypoint.northSouth += distance * modifier;
  } else {
    waypoint.eastWest += distance * modifier;
  }
};

const moveShip = (distance) => {
  ship.northSouth += distance * waypoint.northSouth;
  ship.eastWest += distance * waypoint.eastWest;
}

for (const line of data) {
  const [, direction, degree] = line.match(directionRegex);
  if (direction === 'F') {
    moveShip(parseInt(degree));
  } else if (direction === 'R' || direction === 'L') {
    turn(direction, parseInt(degree));
  } else {
    move(direction, parseInt(degree));
  }
}
console.log(Math.abs(ship.northSouth) + Math.abs(ship.eastWest));
