import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const stringifyDiffElemOption = {
  changed: ({ value1, value2 }, path = '') => `Property '${path}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
  removed: (diffElem, path = '') => `Property '${path}' was removed`,
  added: ({ value2 }, path = '') => `Property '${path}' was added with value: ${stringify(value2)}`,
  nested: ({ children }, path = '') => children.flatMap((a) => stringifyDiffElemOption[a.type](a, `${path}.${a.key}`)).join('\n'),
  unchanged: () => [],
};

const formatPlain = (diffElems) => [
  ...diffElems.flatMap((a) => stringifyDiffElemOption[a.type](a, a.key)),
].join('\n');

export default formatPlain;
