const { getData } = require('../shared/getData');
let data = getData('./input.txt');
data = data.map(num => parseInt(num));

const groupSize = 25;

const getNumber = () => {
  let theNumber;
  for (const [i, num] of data.entries()) {
    if (i < groupSize) continue;
    const group = data.slice(i - groupSize, i);
    let isValid = false;
    for (const prevNum of group) {
      if (num / 2 === prevNum) continue;
      if (group.includes(num - prevNum)) {
        isValid = true;
        break;
      }
    }
    if (!isValid) {
      theNumber = num;
      break;
    }
  }
  return theNumber;
};

exports.getNumber = getNumber;
