import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('CorrectInputNestedJSON', () => {
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('CorrectInputYaml', () => {
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(expected);
});

test('File1Empty', () => {
  const expected = `{
  + common: {
        follow: false
        setting1: Value 1
        setting3: null
        setting4: blah blah
        setting5: {
            key5: value5
        }
        setting6: {
            key: value
            ops: vops
            doge: {
                wow: so much
            }
        }
    }
  + group1: {
        foo: bar
        baz: bars
        nest: str
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  const result = genDiff(getFixturePath('file3.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('File2Empty', () => {
  const expected = `{
  - common: {
        setting1: Value 1
        setting2: 200
        setting3: true
        setting6: {
            key: value
            doge: {
                wow: 
            }
        }
    }
  - group1: {
        baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
}`;
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file3.json'));
  expect(result).toEqual(expected);
});

test('BothFilesEmpty', () => {
  const expected = `{
}`;
  const result = genDiff(getFixturePath('file3.json'), getFixturePath('file3.json'));
  expect(result).toEqual(expected);
});
