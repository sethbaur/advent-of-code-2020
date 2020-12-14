const { getData } = require('../shared/getData');

let data = getData('./input.txt');
data = data.map(num => parseInt(num)).sort((a, b) => a - b);
data.push(data[data.length - 1] + 3);
data.unshift(0);

let combinations = []
for (const adapter of data) {
  combinations[adapter] = data.filter(num => {
    const diff = adapter - num;
    return num < adapter && diff <= 3;
  });
}

const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    const n = args[0];
    if (args in cache) {
      return cache[args];
    }
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}

const calculatePath = memoize(number => {
  if (number === 0) {
    return 1;
  }
  const options = combinations[number];
  let valid = 0;
  for (const adapter of options) {
    valid += calculatePath(adapter);
  }
  return valid;
});

const result = calculatePath(data[data.length - 1]);

console.log(result);
