const fs = require('fs')

const getData = (filename) => {
  let data;

  try {
    data = fs.readFileSync(filename, 'utf8');
  } catch (err) {
    console.error(err);
  }

  data = data.split('\n');

  if (data[data.length - 1] === "") data.pop();
  return data;
};

const convertToGroups = (data) => {
  const groupedData = [];
  let currDataIndex = 0;

  // I'm sure this could be better, but I'm moving on
  for (const datum of data) {
    if (!datum) {
      currDataIndex++;
      continue;
    }
    if (!groupedData[currDataIndex]) {
      groupedData[currDataIndex] = [];
    }
    groupedData[currDataIndex].push(datum);
  }
  return groupedData;
}

exports.getData = getData;
exports.convertToGroups = convertToGroups;
