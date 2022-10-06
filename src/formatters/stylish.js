import _ from 'lodash';

const stringify = (value, initialIndentLevel = 1, spacesCount = 1) => {
  const stringifyInternal = (val, indentLevel = initialIndentLevel) => {
    if (!_.isObject(val) || val === null) {
      return String(val);
    }
    const indent = '    '.repeat(indentLevel * spacesCount);
    const bracketIndent = '    '.repeat((indentLevel - 1) * spacesCount);
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
const getIndent = (indentLevel) => ' '.repeat(indentLevel * indentSize - markerSize);
const getBracketIndent = (indentLevel) => ' '.repeat(indentLevel * indentSize);

const stringifyDiffElemOption = {
  changed: ({ key, value1, value2 }, indentLevel) => [
    `${getIndent(indentLevel)}- ${key}: ${stringify(value1, indentLevel + 1)}`,
    `${getIndent(indentLevel)}+ ${key}: ${stringify(value2, indentLevel + 1)}`,
  ],
  removed: ({ key, value1 }, indentLevel) => `${getIndent(indentLevel)}- ${key}: ${stringify(value1, indentLevel + 1)}`,
  added: ({ key, value2 }, indentLevel) => `${getIndent(indentLevel)}+ ${key}: ${stringify(value2, indentLevel + 1)}`,
  nested: ({
    key, children,
  }, indentLevel) => {
    const diffElems = children;
    return [
      `${getIndent(indentLevel)}  ${key}: {`,
      ...diffElems.flatMap((a) => stringifyDiffElemOption[a.type](a, indentLevel + 1)),
      `${getBracketIndent(indentLevel)}}`,
    ];
  },
  unchanged: ({ key, value2 }, indentLevel) => `${getIndent(indentLevel)}  ${key}: ${value2}`,
};

const formatStylish = (diffElems) => [
  '{',
  ...diffElems.flatMap((a) => stringifyDiffElemOption[a.type](a, 1)),
  '}',
].join('\n');

export default formatStylish;
