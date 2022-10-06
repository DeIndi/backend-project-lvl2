import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const build = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        type: 'added',
        value2,
      };
    }

    if ((_.has(obj1, key) && !_.has(obj2, key))) {
      return {
        key,
        type: 'removed',
        value1,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      const children = buildDiff(value1, value2);
      return {
        key,
        children,
        type: 'nested',
      };
    }
    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        value1,
        value2,
      };
    }
    return {
      key,
      type: 'unchanged',
      value2,
    };
  };

  return keys.map(build);
};

export default buildDiff;
