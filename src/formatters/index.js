import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

const formatObjDiff = (objDiff, format) => formatters[format](objDiff);

export default formatObjDiff;
