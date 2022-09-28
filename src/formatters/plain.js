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
  changed: (diffElem, path = '') => `Property '${path}' was updated. From ${stringify(diffElem.value1)} to ${stringify(diffElem.value2)}`,
  removed: (diffElem, path = '') => `Property '${path}' was removed`,
  added: (diffElem, path = '') => `Property '${path}' was added with value: ${stringify(diffElem.value2)}`,
  nested: (diffElem, path = '') => diffElem.children.flatMap((a) => stringifyDiffElemOption[a.type](a, `${path}.${a.key}`)).join('\n'),
  unchanged: () => [],
};

const formatPlain = (diffElems) => [
  ...diffElems.flatMap((a) => stringifyDiffElemOption[a.type](a, a.key)),
].join('\n');

export default formatPlain;
