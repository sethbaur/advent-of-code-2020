const { getData } = require('../shared/getData');
const data = getData('./input.txt');

for (const line of data) {
  const current = parseInt(line);
  const target = 2020 - current;
  if (data.indexOf(`${target}`) > -1) {
    console.log(current * target);
    break;
  }
}
