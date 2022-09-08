import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2))); // Array<string>
  const build = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    // 'added', 'removed', 'unchanged', 'changed', 'nested'
    if (!_.has(obj1, key) && _.has(obj2, key)) { // 'added'
      return { // DiffElem
        key,
        type: 'added',
        value2,
      };
    }

    if ((_.has(obj1, key) && !_.has(obj2, key))) { // 'removed'
      return { // DiffElem
        key,
        type: 'removed',
        value1,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      // children
      const children = buildDiff(value1, value2);
      return { // DiffElem
        key,
        children,
        type: 'nested',
      };
    }
    if (value1 !== value2) { // 'changed'
      return { // DiffElem
        key,
        type: 'changed',
        value1,
        value2,
      };
    }
    return { // DiffElem
      key,
      type: 'unchanged',
      value2,
    };
  };

  // Array<string> -> Array<DiffElem>
  // build = (key: string) => DiffElem;
  return keys.map(build); // Array<DiffElem>
};

export default buildDiff;
