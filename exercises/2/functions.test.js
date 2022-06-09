test('2.1 Write a function (named concat) that can take any number of strings and join them to one single string', () => {
  // Write your code here
  // ...
  // -----------------------

  expect(
    concat(
      'Hey',
      ' ',
      'there',
      '!',
      ' ',
      'How',
      "'re",
      ' ',
      'you',
      ' ',
      'doing',
      '?'
    )
  ).toEqual("Hey there! How're you doing?");
});

test('2.2 Write a function (zip) that take two lists and sum each index-position with each other, it should throw RangeError if length of a != b, zip([1,1],[1,2]) -> [2,3] ', () => {
  // Write your code here...
  // ...
  // -----------------------

  expect(zip([1, 2, 3], [1, 2, 3])).toEqual([2, 4, 6]);
  expect(zip([234, 123, 29384], [250, 124, 2788])).toEqual([484, 247, 32172]);
  expect(() => zip([1, 2, 3, 4], [1])).toThrow(RangeError);
});

test('2.3 create a function returns N:th fibonacci number (start at index 0)', () => {
  // Write your code here...
  // ...
  // -----------------------

  expect(fibonacci(0)).toEqual(0);
  expect(fibonacci(1)).toEqual(1);
  expect(fibonacci(2)).toEqual(1);
  expect(fibonacci(3)).toEqual(2);
  expect(fibonacci(4)).toEqual(3);
  expect(fibonacci(12)).toEqual(144);
  expect(fibonacci(20)).toEqual(6765);
});
