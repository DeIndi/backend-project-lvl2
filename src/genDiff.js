import fs from 'fs';

const isInRecords = (record, records) => (!!records.find((x) => x[0] === record[0]
 && x[1] === record[1]));

const isInRecordsDiffVal = (record, records) => (!!records.find((x) => x[0] === record[0]
 && x[1] !== record[1]));

const getRecordDiffVal = (record, records) => {
  const recordDiffVal = records.find((x) => x[0] === record[0] && x[1] !== record[1]);
  return `  + ${recordDiffVal[0]}: ${recordDiffVal[1]}`;
};

const getRecord = (record, records) => {
  if (!isInRecords(record, records)) {
    return `  - ${record[0]}: ${record[1]}`;
  }
  return `    ${record[0]}: ${record[1]}`;
};

const compareObjects = (obj1, obj2) => {
  const obj1Records = Object.entries(obj1);
  const obj2Records = Object.entries(obj2);
  return [
    '{',
    ...obj1Records.reduce((acc, x) => {
      acc.push(getRecord(x, obj2Records));
      if (isInRecordsDiffVal(x, obj2Records)) {
        acc.push(getRecordDiffVal(x, obj2Records));
      }
      return acc;
    }, []),
    '}',
  ].join('\n');
};

const genDiff = (file1, file2) => {
  const file1Content = fs.readFileSync(file1);
  const file2Content = fs.readFileSync(file2);

  const obj1 = JSON.parse(file1Content);
  const obj2 = JSON.parse(file2Content);
  console.log(obj1);
  console.log(obj2);
  console.log(compareObjects(obj1, obj2));
};

export default genDiff;
