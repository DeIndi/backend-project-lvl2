import yaml from 'js-yaml';

const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const parseData = (fileContent, extension) => {
  let parse;
  if ((extension === '.json') || (extension === '')) {
    parse = JSON.parse;
  } else if ((extension === '.yml') || (extension === '.yaml')) {
    parse = yaml.load;
  } 
  return fileContent ? parse(fileContent) : {};
};

export default parseData;