import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parseData from './parseData.js';
import _ from 'lodash';
import { formatStylish } from '../formatters/stylish.js';
import { formatPlain } from '../formatters/plain.js';

const buildDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort(); // Array<string>
  const build = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    // 'added', 'removed', 'unchanged', 'changed', 'nested'
    if (!_.has(obj1, key) && _.has(obj2, key)) { // 'added'
      return { // DiffElem
        key: key,
        type: 'added',
        value: value2,
      };
    }

    if ((_.has(obj1, key) && !_.has(obj2, key))) { // 'removed'
      return { // DiffElem
        key: key,
        type: 'removed',
        value: value1,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      // children
      const children = buildDiff(value1, value2);
      return { // DiffElem
        key: key,
        children,
        type: 'nested', 
      };
    }
    if (value1 !== value2) { // 'changed'
      return { // DiffElem
        key: key,
        type: 'changed', 
        value1,
        value2,
      };
    }
    return { // DiffElem
      key: key,
      type: 'unchanged', 
      value: value2,
    };
  };

  // Array<string> -> Array<DiffElem>
  // build = (key: string) => DiffElem;
  return keys.map(build); // Array<DiffElem>
};

const build = (key, obj1, obj2) => {
  const val1 = obj1[key];
  const val2 = obj2[key];
  if (val1 && val2) {
    if (val1 === val2 || _.isObject(val1) && _.isObject(val2)) {
      const children = _.isObject(val2) ? buildDiff(val1, val2) : [];
      return { key, children, type: 'unchanged', value: _.isObject(val1) ? null : val1, }
    }
  }
};

const genDiff = (file1, file2, formatter = 'stylish') => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const file1Content = fs.readFileSync(path.resolve(file1));
  const file2Content = fs.readFileSync(path.resolve(file2));
  const obj1 = parseData(file1Content, extension1);
  const obj2 = parseData(file2Content, extension2);
  if (formatter === 'stylish'){
    return (formatStylish(buildDiff(obj1, obj2)));
  }
  if (formatter === 'plain'){
    return (formatPlain(buildDiff(obj1, obj2)));
  }
  if (formatter === 'json'){
    return (JSON.stringify(buildDiff(obj1, obj2)));
  }
};

export default genDiff;
