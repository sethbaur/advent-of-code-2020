const fs = require('fs')

let data;

try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err);
}

data = data.split('\n');
data.pop();

for (const line of data) {
  const current = parseInt(line);
  const target = 2020 - current;
  if (data.indexOf(`${target}`) > -1) {
    console.log(current * target);
    break;
  }
}
