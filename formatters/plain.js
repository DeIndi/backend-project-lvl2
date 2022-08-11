import fs from 'node:fs';
import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)){
    return '[complex value]';
  }
  if (_.isString(value)){
    return `'${value}'`;
  }
  return `${value}`;
};

const stringifyDiffElem = (diffElem, path = '') => {
  if (_.isObject(diffElem.value)){
    path = '[complex value]';
  }
  if (diffElem.type === 'changed') {
    return `Property ${path} was updated. From ${stringify(diffElem.value1)} to ${stringify(diffElem.value2)}`;
  }
  if (diffElem.type === 'removed') {
    return `Property ${path} was removed`;
  }
  if (diffElem.type === 'added') {
    return `Property ${path} was added with value: ${stringify(diffElem.value)}`;
  }
  if (diffElem.type === 'nested') {
    const diffElems = diffElem.children;
    return diffElems.flatMap((a) => stringifyDiffElem(a, path + '.' + diffElem.key)).join('\n');
  }
  return [];
};

const formatPlain = (diffElems) => {
  return [
    ...diffElems.flatMap((a) => stringifyDiffElem(a, '')),
  ].join('\n');
};

export { formatPlain } ;