import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const formatsToTest = [
  'yml',
  'json',
];

const resultFormats = [
  'stylish',
  'plain',
  'json'
];

const expectedOption = {
  stylish: readFileSync(getFixturePath('result_stylish.txt'), 'utf-8').trim(),
  plain: readFileSync(getFixturePath('result_plain.txt'), 'utf-8').trim(),
  json: readFileSync(getFixturePath('result_json.txt'), 'utf-8').trim()
};

describe('gendiff', () => {
  describe.each(formatsToTest)('using format %s', (format) => {
    const fixture1 = getFixturePath(`file1.${format}`);
    const fixture2 = getFixturePath(`file2.${format}`);
    it('default result - stylish', () => {
      const expected = expectedOption.stylish;
      const result = genDiff(fixture1, fixture2);
      expect(result).toEqual(expected);
    });

    it.each(resultFormats)('result - %s', (resultKey) => {
      const result = genDiff(fixture1, fixture2, resultKey);
      const expected = expectedOption[resultKey];
      expect(result).toEqual(expected);
    });
  });
});
