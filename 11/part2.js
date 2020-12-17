const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const waitingArea = data.map(line => line.split(''));

const pastLayouts = [];
let currentLayout = waitingArea;
let stabilized = false;

const checkSeatIsOccupied = (x, y) => {
  if (currentLayout[y] && currentLayout[y][x] && currentLayout[y][x] === '#') {
    return true;
  }
  return false;
};

const checkSeatIsUnoccupied = (x, y) => {
  if (currentLayout[y] && currentLayout[y][x] && currentLayout[y][x] === 'L') {
    return true;
  }
  return false;
};

const checkForVisibleOccupiedSeat = (x, y, [deltaX, deltaY]) => {
  if (!currentLayout[y] || !currentLayout[y][x]) {
    return false;
  }
  const newX = x + deltaX;
  const newY = y + deltaY;
  if (checkSeatIsOccupied(newX, newY)) {
    return true;
  }
  if (checkSeatIsUnoccupied(newX, newY)) {
    return false;
  }
  return checkForVisibleOccupiedSeat(newX, newY, [deltaX, deltaY]);
};

const getAdjacentCount = (x, y) => {
  const adjacentSeats = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  return adjacentSeats.reduce((acc, curr) => {
    if (checkForVisibleOccupiedSeat(x, y, curr)) return acc + 1;
    return acc;
  }, 0);
};

const serializeWaitingArea = (area) => {
  return area.reduce((acc, curr) => {
    return acc + curr.join('');
  }, '');
};

const evaluateArea = (area) => {
  const serializedInput = serializeWaitingArea(area);
  if (pastLayouts.includes(serializedInput)) {
    stabilized = true;
    return;
  };
  pastLayouts.push(serializedInput);
  const updated = area.map((row, y) => {
    return row.map((seat, x) => {
      const count = getAdjacentCount(x, y);
      if (seat === 'L' && count === 0) {
        return '#';
      }
      if (seat === '#' && count > 4) {
        return 'L';
      }
      return seat;
    });
  });
  currentLayout = updated;
};

while (!stabilized) {
  evaluateArea(currentLayout);
};

const result = serializeWaitingArea(currentLayout);
console.log(result.match(/#/g).length);
