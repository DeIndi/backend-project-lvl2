import genDiff from '../src/genDiff.js'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
//const getFixturePath = (filename) => path.join('..', '_fixtures_', filename);

test('CorrectInput', () => {
  const expected = 
`{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const dirPath = '_fixtures_';

  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('File1Empty', () => {
  const expected = 
`{
  + timeout: 20
  + verbose: true
  + host: hexlet.io
}`;
  const result = genDiff(getFixturePath('file3.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('File2Empty', () => {
  const expected = 
`{
  - host: hexlet.io
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
}`;
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file3.json'));
  expect(result).toEqual(expected);
});


test('BothFilesEmpty', () => {
  const expected = 
`{
}`;
  const result = genDiff(getFixturePath('file3.json'), getFixturePath('file3.json'));
  expect(result).toEqual(expected);
}); 