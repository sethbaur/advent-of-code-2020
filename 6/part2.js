const { getData, convertToGroups } = require('../shared/getData');
const data = convertToGroups(getData('./input.txt'));

let correct = 0;
for (const group of data) {
  for (const ans of group[0].split('')) {
    const answered = group.filter(response => response.indexOf(ans) > -1);
    if (group.length === answered.length) correct++;
  }
}

console.log(correct);
