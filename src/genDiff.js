import fs from 'fs';
import path from 'path';
import parse from './parseData.js';

import buildDiff from './buildDiff.js';
import formatObjDiff from './formatters/index.js';

const getContent = (file) => fs.readFileSync(path.resolve(file));

const getFormat = (file) => path.extname(file).slice(1);

const genDiff = (file1, file2, formatter = 'stylish') => {
  const obj1 = parse(getContent(file1), getFormat(file1));
  const obj2 = parse(getContent(file2), getFormat(file2));
  return formatter ? formatObjDiff(buildDiff(obj1, obj2), formatter) : null;
};

export default genDiff;
