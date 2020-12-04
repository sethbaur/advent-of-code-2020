const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const regex = /^(\d+)-(\d+)\s(.):\s(.*)/;
let valid = 0;

for (const line of data) {
  const [, min, max, char, password] = line.match(regex);

  const charMatches = password.match(new RegExp(char, 'g'));
  if (!charMatches) continue;

  const occurences = charMatches.length;
  if (occurences >= min && occurences <= max) valid++;
}

console.log(valid);
