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

exports.getData = getData;
