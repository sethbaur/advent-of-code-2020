const { getData } = require('../shared/getData');
const data = getData('./input.txt');

const regex = /^(.*) bags? contain (.*)\.$/;
const colorRegex = /^\d+ (.*) bags?$/;
const myBag = 'shiny gold';

const bagTypes =[];
for (const rule of data) {
  const [, color, possibleContents] = rule.match(regex);
  const contents = possibleContents.split(', ');
  if (contents[0] !== 'no other bags') {
    bagTypes[color] = contents.map((bag) => bag.match(colorRegex)[1]);
  }
}

const checkForMyBagType = color => {
  if (!bagTypes[color]) return false;
  if (color === myBag || bagTypes[color].indexOf(myBag) > -1) return true;
  const contents = bagTypes[color].filter(content => checkForMyBagType(content));
  return !!contents.length;
};

let valid = 0;
for (const bag in bagTypes) {
  if (bag === myBag) continue;
  if (checkForMyBagType(bag)) valid++;
}

console.log(valid);
