import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const expectedOption = {
  stylish: readFileSync(getFixturePath('result_stylish.txt'), 'utf-8').trim(),
  plain: readFileSync(getFixturePath('result_plain.txt'), 'utf-8').trim(),
};

const extensions = ['json', 'yml'];

describe('gendiff different input', () => {
  extensions.forEach((e) => {
    test.each([
      [`file1.${e}`, `file2.${e}`, 'stylish'],
      [`file1.${e}`, `file2.${e}`, 'plain'],
    ])('%s and %s with %s format', (filePath1, filePath2, expectedVar) => {
      const fixture1 = getFixturePath(filePath1);
      const fixture2 = getFixturePath(filePath2);
      const expected = expectedOption[expectedVar];
      const result = (expectedVar === 'plain') ? genDiff(fixture1, fixture2, 'plain') : genDiff(fixture1, fixture2);
      expect(result).toEqual(expected);
    });
  });
});
