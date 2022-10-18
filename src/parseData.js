import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const parse = (fileContent, format = 'json') => parsers[format](fileContent);

export default parse;
