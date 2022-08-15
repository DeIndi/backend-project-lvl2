import yaml from 'js-yaml';

const parseData = (fileContent, extension) => {
  let parse;
  if ((extension === '.json') || (extension === '')) {
    parse = JSON.parse;
  } else if ((extension === '.yml') || (extension === '.yaml')) {
    parse = yaml.load;
  }
  return fileContent.length <= 0 ? {} : parse(fileContent);
};

export default parseData;
