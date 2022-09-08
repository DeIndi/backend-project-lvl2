import fs from 'fs';
import path from 'path';
import parse from './parseData.js';
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import buildDiff from './buildDiff.js';

const formatterOption = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify
}

const genDiff = (file1, file2, formatter = 'stylish') => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const format1 = extension1.slice(1);
  const format2 = extension2.slice(1);
  const file1Content = fs.readFileSync(path.resolve(file1));
  const file2Content = fs.readFileSync(path.resolve(file2));
  const obj1 = parse(file1Content, format1);
  const obj2 = parse(file2Content, format2);
  return formatter ? formatterOption[formatter](buildDiff(obj1, obj2)) : null;
};

export default genDiff;
