import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const getParser = (format) => parsers[format];

const parse = (fileContent, format = 'json') => getParser(format)(fileContent);

export default parse;
