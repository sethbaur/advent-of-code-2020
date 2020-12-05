const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const passportData = [];
let currDataIndex = 0;

// I'm sure this could be better, but I'm moving on
for (const datum of data) {
  if (!datum) {
    currDataIndex++;
    continue;
  }
  if (!passportData[currDataIndex]) {
    passportData[currDataIndex] = [];
  }
  passportData[currDataIndex].push(datum);
}

const checks = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let validCount = 0;
for (const datum of passportData) {
  const passport = datum.join(' ');
  let isValid = true;
  for (const check of checks) {
    if (passport.indexOf(check) === -1) {
      isValid = false;
      break;
    }
  }
  if (isValid) validCount++;
}

console.log(validCount);
