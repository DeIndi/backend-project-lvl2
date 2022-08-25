import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parseData.js';
import formatStylish from '../formatters/stylish.js';
import formatPlain from '../formatters/plain.js';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2))); // Array<string>
  const build = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    // 'added', 'removed', 'unchanged', 'changed', 'nested'
    if (!_.has(obj1, key) && _.has(obj2, key)) { // 'added'
      return { // DiffElem
        key,
        type: 'added',
        value2,
      };
    }

    if ((_.has(obj1, key) && !_.has(obj2, key))) { // 'removed'
      return { // DiffElem
        key,
        type: 'removed',
        value1,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      // children
      const children = buildDiff(value1, value2);
      return { // DiffElem
        key,
        children,
        type: 'nested',
      };
    }
    if (value1 !== value2) { // 'changed'
      return { // DiffElem
        key,
        type: 'changed',
        value1,
        value2,
      };
    }
    return { // DiffElem
      key,
      type: 'unchanged',
      value2,
    };
  };

  // Array<string> -> Array<DiffElem>
  // build = (key: string) => DiffElem;
  return keys.map(build); // Array<DiffElem>
};

const genDiff = (file1, file2, formatter = 'stylish') => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const format1 = extension1.slice(1);
  const format2 = extension2.slice(1);
  const file1Content = fs.readFileSync(path.resolve(file1));
  const file2Content = fs.readFileSync(path.resolve(file2));
  const obj1 = parse(file1Content, format1);
  const obj2 = parse(file2Content, format2);
  if (formatter === 'stylish') {
    return (formatStylish(buildDiff(obj1, obj2)));
  }
  if (formatter === 'plain') {
    return (formatPlain(buildDiff(obj1, obj2)));
  }
  if (formatter === 'json') {
    return (JSON.stringify(buildDiff(obj1, obj2)));
  }
  return null;
};

export default genDiff;
