test('1.1 Create a variable named num that contains the value 42', () => {
  // Write your code here
  // ...
  // ----------------------

  expect(typeof num).toBe('number');
  expect(num).toBe(42);
});

test('1.2 Create a variable named num with the value 42.013', () => {
  // Write your code here
  // ...
  // -----------------------

  expect(typeof num).toBe('number');
  expect(num).toBe(42.013);
});

test('1.3 Create variable named `message` and assign a string value to it.', () => {
  // Write your code here
  // ...
  // --------------------

  expect(typeof message).toBe('string');
});

test('1.4 create an array of length 5, named `arr`', () => {
  // Write your code here
  // ...
  // --------------------

  expect(Array.isArray(arr)).toBeTruthy();
  expect(arr.length).toBe(5);
});

test('1.5. create an object named `person`, which includes a firstName, lastName, and age -property', () => {
  // Write your code here
  // ...
  // --------------------

  expect(person.firstName).toBeDefined();
  expect(typeof person.firstName).toBe('string');
  expect(person.lastName).toBeDefined();
  expect(typeof person.lastName).toBe('string');
  expect(person.age).toBeDefined();
  expect(typeof person.age).toBe('number');
});
