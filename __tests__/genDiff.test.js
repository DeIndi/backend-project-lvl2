import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('CorrectInputNestedJSON', () => {
  const expected = readFileSync(getFixturePath('result_stylish.txt'), 'utf-8').trim();
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('CorrectInputYaml', () => {
  const expected = readFileSync(getFixturePath('result_stylish.txt'), 'utf-8').trim();
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(expected);
});

test('CorrectInputPlainFormatter', () => {
  const expected = readFileSync(getFixturePath('result_plain.txt'), 'utf-8').trim();
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(result).toEqual(expected);
});
