const fs = require('fs');
const path = require('path');
const namesFilePath = path.resolve(__dirname, 'names.txt');
const names2FilePath = path.resolve(__dirname, 'names2.txt');

const file = fs.readFileSync(namesFilePath, { encoding: 'utf8' });
const names = file
  .split('\n')
  .filter(name => {
    return name.length > 1;
  })
  .filter(name => {
    return name.indexOf('Anexo') == -1;
  })
  .filter(name => {
    return name.indexOf('(nombre)') == -1;
  })
  .filter(name => {
    return name.indexOf('(') == -1;
  })
  .sort();

fs.writeFileSync(names2FilePath, names.join('\n'), { encoding: 'utf8' });
