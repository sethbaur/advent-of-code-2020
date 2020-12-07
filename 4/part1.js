const { getData, convertToGroups } = require('../shared/getData');
const data = convertToGroups(getData('./input.txt'));

const checks = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let validCount = 0;
for (const datum of data) {
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
