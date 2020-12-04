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
  for (const lineB of data) {
    const second = parseInt(lineB);
    const target = 2020 - current - second;
    if (data.indexOf(`${target}`) > -1) {
      console.log(current * second * target);
      break;
    }
  }
}
