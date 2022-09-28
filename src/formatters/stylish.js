import _ from 'lodash';

const stringify = (value, initialIndentLevel = 1, replacer = '    ', spacesCount = 1) => {
  const stringifyInternal = (val, indentLevel = initialIndentLevel) => {
    if (!_.isObject(val) || val === null) {
      return String(val);
    }
    const indent = replacer.repeat(indentLevel * spacesCount);
    const bracketIndent = replacer.repeat((indentLevel - 1) * spacesCount);
    const properties = Object.entries(val);
    return [
      '{',
      ...properties.map(
        ([k, v]) => `${indent}${k}: ${stringifyInternal(v, indentLevel + 1)}`,
      ),
      `${bracketIndent}}`,
    ].join('\n');
  };
  return stringifyInternal(value, initialIndentLevel);
};

const indentSize = 4;
const markerSize = 2;
// redefine function name
const getIndent = (indentLevel) => ' '.repeat(indentLevel * indentSize - markerSize);

const stringifyDiffElemOption = {
  changed: (diffElem, indentLevel) => {
    const indent = getIndent(indentLevel);
    return [
      `${indent}- ${diffElem.key}: ${stringify(diffElem.value1, indentLevel + 1)}`,
      `${indent}+ ${diffElem.key}: ${stringify(diffElem.value2, indentLevel + 1)}`,
    ];
  },
  removed: (diffElem, indentLevel) => `${getIndent(indentLevel)}- ${diffElem.key}: ${stringify(diffElem.value1, indentLevel + 1)}`,
  added: (diffElem, indentLevel) => `${getIndent(indentLevel)}+ ${diffElem.key}: ${stringify(diffElem.value2, indentLevel + 1)}`,
  nested: (diffElem, indentLevel) => {
    const indent = getIndent(indentLevel);
    const diffElems = diffElem.children;
    const bracketIndent = ' '.repeat((indentLevel * indentSize));
    return [
      `${indent}  ${diffElem.key}: {`,
      ...diffElems.flatMap((a) => stringifyDiffElemOption[a.type](a, indentLevel + 1)),
      `${bracketIndent}}`,
    ];
  },
  unchanged: (diffElem, indentLevel) => `${getIndent(indentLevel)}  ${diffElem.key}: ${diffElem.value2}`,
};

/* const stringifyDiffElem = (diffElem, indentLevel) => {
  const indent = ' '.repeat(indentLevel * 4 - 2);
  if (diffElem.type === 'changed') {
    return [
      `${indent}- ${diffElem.key}: ${stringify(diffElem.value1, indentLevel + 1)}`,
      `${indent}+ ${diffElem.key}: ${stringify(diffElem.value2, indentLevel + 1)}`,
    ];
  }
  if (diffElem.type === 'removed') {
    return `${indent}- ${diffElem.key}: ${stringify(diffElem.value1, indentLevel + 1)}`;
  }
  if (diffElem.type === 'added') {
    return `${indent}+ ${diffElem.key}: ${stringify(diffElem.value2, indentLevel + 1)}`;
  }
  if (diffElem.type === 'nested') {
    const diffElems = diffElem.children;
    const bracketIndent = ' '.repeat((indentLevel * 4));
    return [
      `${indent}  ${diffElem.key}: {`,
      ...diffElems.flatMap((a) => stringifyDiffElem(a, indentLevel + 1)),
      `${bracketIndent}}`,
    ];
  }
  return `${indent}  ${diffElem.key}: ${diffElem.value2}`;
}; */

const formatStylish = (diffElems) => [
  '{',
  ...diffElems.flatMap((a) => stringifyDiffElemOption[a.type](a, 1)),
  '}',
].join('\n');

export default formatStylish;
