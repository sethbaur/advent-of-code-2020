const { getData, convertToGroups } = require('../shared/getData');
const data = convertToGroups(getData('./input.txt'));

let correct = 0;
for (const group of data) {
  const all = group.reduce((acc, curr) => acc += curr, '').split('').filter((ans, idx, arr) => {
    return arr.indexOf(ans) === idx;
  });
  correct += all.length;
}

console.log(correct);
