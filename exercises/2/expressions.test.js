test('3.1 expressions', () => {
  // Write your code here
  const a = 3;
  const b = 2;
  const c = 5;
  // --------------------

  const d = '3';

  expect(a > b).toBeTruthy();
  expect(b < a).toBeTruthy();
  expect(b <= a).toBeTruthy();
  expect(a >= b).toBeTruthy();
  expect(a == d).toBeTruthy();
  expect(a === +d).toBeTruthy();
  expect(a === c - b).toBeTruthy();
});
