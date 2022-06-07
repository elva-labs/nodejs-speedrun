import fs from 'fs';
import readline from 'readline';

test('3.2 Implement inputModule.run, so that it calls cb for each string in `input`. Then, implement the callback that should sum the length of each string to the variable named `result`', () => {
  let result = 0;
  const input = ['sokdf', 'vbn', 234, 'soid', 1232, 'a32.;2', '..123.98012'];
  const inputModule = {
    run(cb) {
      // Write your code here...
      input.forEach((v) => {
        if (typeof v === 'string') {
          cb(null, v);
        } else {
          cb(v);
        }
      });
      // -----------------------
    },
  };

  // Write your code here...
  inputModule.run((err, v) => {
    err ? null : (result += v.length);
  });
  // -----------------------

  expect(result).toBe(29);
});

test('3.3 Read each line from exercises/3/input.dat with `createReadStream`, sum all even numbers using a variable called "reader" which should be created using `readline.createInterface`, then make use of the method `on("line", cb)` ', (done) => {
  let result = 0;

  // Write your code here...
  const fileStream = fs.createReadStream('exercises/3/input.dat');
  const reader = readline.createInterface(fileStream);

  reader.on('line', (chunk) => {
    const n = Number(chunk);

    if (isNaN(n) || n % 2 != 0) {
      return;
    }

    result += n;
  });
  // ----------------------

  reader.on('close', () => {
    expect(result).toBe(64678);
    done();
  });
});

test('3.4 write a promise that resolves with any "string" after 500 ms, use promise.then(cb)', (done) => {
  let promise;

  // Write your code here...
  promise = new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve('Hello Promise');
    }, 500);
  });
  // -----------------------

  promise.then((res) => {
    expect(res).toEqual('Hello Promise');
    done();
  });
});

test('3.5 write a promise that resolves with any "string" after 500 ms, but this time use async/await', async () => {
  let promise;

  // Write your code here...
  promise = new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve('Hello Promise');
    }, 500);
  });
  // -----------------------

  const res = await promise;

  expect(res).toEqual('Hello Promise');
});

test('3.6 refactor or copy parts of 3.3, but now create a function that takes one argument (filepath) and returns a promise with the correct result', async () => {
  const lineCounter = (filePath) =>
    // Write your code here...
    new Promise((resolve, _reject) => {
      let result = 0;

      const fileStream = fs.createReadStream(filePath);
      const reader = readline.createInterface(fileStream);

      reader.on('line', (chunk) => {
        const n = Number(chunk);

        if (isNaN(n) || n % 2 != 0) {
          return;
        }

        result += n;
      });

      reader.on('close', () => {
        resolve(result);
      });
      // ----------------------
    });

  const result = await lineCounter('exercises/3/input.dat');

  expect(result).toEqual(64678);
});
