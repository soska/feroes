const fs = require('fs');
const path = require('path');
const namesFilePath = path.resolve(__dirname, 'names2.txt');
const jsonFilePath = path.resolve(__dirname, 'names.js');

const file = fs.readFileSync(namesFilePath, { encoding: 'utf8' });
const names = file
  .split('\n')
  .sort()
  .map(name => {
    return { name, difficulty: 0 };
  });

const json = JSON.stringify(names);

fs.writeFileSync(jsonFilePath, json, { encoding: 'utf8' });
