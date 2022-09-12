import fs from 'fs';
import path from 'path';
import parse from './parseData.js';
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import buildDiff from './buildDiff.js';

const formatterOption = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

const getContent = (file) => fs.readFileSync(path.resolve(file));

const getFormat = (file) => path.extname(file).slice(1);

const genDiff = (file1, file2, formatter = 'stylish') => {
  const format1 = getFormat(file1);
  const format2 = getFormat(file2);
  const file1Content = getContent(file1);
  const file2Content = getContent(file2);
  const obj1 = parse(file1Content, format1);
  const obj2 = parse(file2Content, format2);
  return formatter ? formatterOption[formatter](buildDiff(obj1, obj2)) : null;
};

export default genDiff;
