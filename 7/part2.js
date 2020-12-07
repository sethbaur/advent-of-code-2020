const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const regex = /^(.*) bags? contain (.*)\.$/;
const colorRegex = /^(\d+) (.*) bags?$/;
const myBag = 'shiny gold';

const bagTypes =[];
for (const rule of data) {
  const [, color, possibleContents] = rule.match(regex);
  const contents = possibleContents.split(', ');
  if (contents[0] !== 'no other bags') {
    bagTypes[color] = contents.map((bag) => {
      const [, count, color] = bag.match(colorRegex);
      return { count: parseInt(count), color };
    });
  }
}

const getBagCount = color => {
  const rule = bagTypes[color];
  if (!bagTypes[color]) return 1;
  return rule.reduce((acc, curr) => acc += curr.count * getBagCount(curr.color), 1);
};

// subtract 1 for the gold bag itself
console.log(getBagCount(myBag) - 1);
