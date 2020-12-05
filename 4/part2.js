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

const getValue = (key, passport) => {
  const regex = new RegExp(`${key}:([^\\s]+)`);
  const results = passport.match(regex);
  return results ? results[1] : false;
};

const checkYear = (passport, key, min, max) => {
  const result = getValue(key, passport);
  if (result) {
    const year = parseInt(result);
    if (year >= min && year <= max) {
      return true;
    }
  }
  return false;
};

const checks = [
  passport => {
    return checkYear(passport, 'byr', 1920, 2002);
  },
  passport => {
    return checkYear(passport, 'iyr', 2010, 2020);
  },
  passport => {
    return checkYear(passport, 'eyr', 2020, 2030);
  },
  passport => {
    const result = getValue('hgt', passport);
    if (result) {
      const heightRegex = /^([0-9]+)(cm|in)$/;
      const match = result.match(heightRegex);
      if (match) {
        const [, heightString, unit] = match;
        const height = parseInt(heightString);
        if ((unit === 'cm' && height >= 150 && height <= 193)
            || (unit === 'in' && height >= 59 && height <= 76)) {
          return true;
        }
      }
    }
    return false;
  },
  passport => {
    const result = getValue('hcl', passport);
    if (result) {
      const colorRegex = /^#[0-9a-f]{6}$/;
      const match = result.match(colorRegex);
      if (match) {
        return true;
      }
    }
    return false;
  },
  passport => {
    const result = getValue('ecl', passport);
    if (result) {
      const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
      return eyeColors.includes(result);
    }
    return false;
  },
  passport => {
    const result = getValue('pid', passport);
    if (result) {
      const pidRegex = /^[\d]{9}$/;
      return !!result.match(pidRegex);
    }
    return false;
  },
];

let validCount = 0;
for (const datum of passportData) {
  const passport = datum.join(' ');
  let isValid = true;
  for (const check of checks) {
    if (!check(passport)) {
      isValid = false;
      break;
    }
  }
  if (isValid) {
    validCount++;
  }
}

console.log(validCount);
