import fs from 'fs';
import path from 'path';

const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const isInRecords = (record, records) => (!!records.find((x) => x[0] === record[0]
 && x[1] === record[1]));

const isInRecordsDiffVal = (record, records) => (!!records.find((x) => x[0] === record[0]
 && x[1] !== record[1]));

const getRecordDiffVal = (record, records) => {
  const recordDiffVal = records.find((x) => x[0] === record[0] && x[1] !== record[1]);
  return `${recordDiffVal[0]}: ${recordDiffVal[1]}`;
};

const getRecordString = (record) => {
  return `${record[0]}: ${record[1]}`;
}

const compareObjects = (obj1, obj2) => {
  const obj1Records = Object.entries(obj1);
  const obj2Records = Object.entries(obj2);
  return [
    '{',
    ...obj1Records.reduce((acc, x) => {
      if (isInRecords(x, obj2Records)) {
        acc.push(`    ${getRecordString(x)}`);
      } else {
        acc.push(`  - ${getRecordString(x)}`);
      }
      if (isInRecordsDiffVal(x, obj2Records)) {
        acc.push(`  + ${getRecordDiffVal(x, obj2Records)}`);
      }
      return acc;
    }, []),
    ...obj2Records.filter((x) => !isInRecords(x, obj1Records) && !isInRecordsDiffVal(x, obj1Records)).
    map((x) => `  + ${getRecordString(x)}`),
    '}',
  ].join('\n');
};

const genDiff = (file1, file2) => {
  const file1Content = fs.readFileSync(path.resolve(file1));
  const file2Content = fs.readFileSync(path.resolve(file2));

  const obj1 = isJsonString(file1Content) ? JSON.parse(file1Content) : {};
  const obj2 = isJsonString(file2Content) ? JSON.parse(file2Content) : {};
  console.log(obj1);
  console.log(obj2);
  console.log(compareObjects(obj1, obj2));
  return compareObjects(obj1, obj2);
};

export default genDiff;
