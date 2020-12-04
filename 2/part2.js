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
  const [, x, y, char, password] = line.match(regex);
  const first = parseInt(x) - 1;
  const second = parseInt(y) - 1;

  if (password[first] === char ^ password[second] === char) {
    valid++;
  }
}

console.log(valid);
