import fs from 'fs';
import path from 'path';
import parse from './parseData.js';

import buildDiff from './buildDiff.js';
import formatObjDiff from './formatters/index.js';

const getContent = (file) => fs.readFileSync(path.resolve(file));

const getFormat = (file) => path.extname(file).slice(1);

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const objDiff1 = parse(getContent(filePath1), getFormat(filePath1));
  const objDiff2 = parse(getContent(filePath2), getFormat(filePath2));
  return formatter ? formatObjDiff(buildDiff(objDiff1, objDiff2), formatter) : null;
};

export default genDiff;
