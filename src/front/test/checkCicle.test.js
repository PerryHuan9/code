

const { checkCircleDep } = require('../checkCicle');

test('flatDeep', () => {
  const arr = [1, 2, 3, [5, 6, 7, [9, 10, 11, [12, 13, 14]]]];

  const notCircledeps = [
    {
      "name": "a",
      "dependencies": {
        "b": "^1.0.0"
      }
    },
    {
      "name": "b",
      "dependencies": {
        "c": "^1.0.0"
      }
    },
    {
      "name": "c",
      "dependencies": {
        "d": "^1.0.0"
      }
    }
  ]
  const circledeps = [
    {
      "name": "a",
      "dependencies": {
        "b": "^1.0.0"
      }
    },
    {
      "name": "b",
      "dependencies": {
        "c": "^1.0.0"
      }
    },
    {
      "name": "c",
      "dependencies": {
        "a": "^1.0.0"
      }
    }
  ]

  expect(checkCircleDep(notCircledeps)).toEqual(false);
  expect(checkCircleDep(circledeps)).toEqual(true);
});

