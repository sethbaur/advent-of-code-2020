const fs = require('fs')

let data;

try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err);
}

data = data.split('\n');
data.pop();

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
