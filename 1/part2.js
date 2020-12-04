const { getData } = require('../shared/getData');
const data = getData('./input.txt');

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
