---
# try also 'default' to start simple
theme: vuetiful
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# NodeJS Speedrun

https://github.com/elva-labs/nodejs-speedrun

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# Agenda

1. Runtime
2. Install
3. First Program
4. Variables & Types
5. Functions
6. Expressions
7. Control Flow
8. Async - Callback & Promise
9. Module Imports
10. Reading & Writing Files
11. HTTP
12. External Packages and Dependencies
13. Building a Server using Express
<!-- 14. Testing -->

---

# Runtime (v8)

- NodeJS is build using `c++`
- We use a high-level language to write less and do more
- [v8 engine](https://v8.dev/docs) - V8 compiles and executes JavaScript (JS) source code
- [libuv](https://github.com/libuv/libuv) - which allow NodeJS to perform asynchronous I/O

<br/>
<br/>

> We'll not dig deeper into these projects and their inner workings. However, it's a good idea to look through the documentation and maybe some code on your own.

<br/>

> FYI - NodeJS and JS will be used interchangeably, CBA.

---

# Installing NodeJS

Node Version Manager (NVM)

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

<br/>

Installing a specific version

```bash
# List remote long term support (lts) releases
nvm ls-remote --lts

# Select a version and install it
nvm install v16.14.2

# Verify node version by output
node --version
```

[Read outlined install instructions here](https://github.com/nvm-sh/nvm#installing-and-updating)

---

# Installing NodeJS

Managing multiple versions on the system

```bash
# List installed version
nvm ls

# change version to 14
nvm install v14.19.1
nvm use v14

# change back to 16
nvm use v16
```

---

# PATH & Env Troubleshooting

- How does my computer find installed programs?
- I\'ve installed the program but can\'t access it on the terminal?

[Help is here](https://github.com/elva-labs/nodejs-speedrun/blob/master/installing/manual-installation.md)

---

# First Program

As always, a simple program to make sure everything is running...

1. Create a new file named `index.js`
   > touch index.js
2. Write `console.log("hello world")` to the file
3. Run your program, `node index.js`

<br/>

```js
// index.js
console.log('hello world');
```

<br/>

> You should see "hello world" outputted to your terminal.

---

# Variables & Types

- Declaration
- Assignment
- re-assignment

<br/>

```js
// Declare and assigning a variable in one step.
const anImmutableVar = 1341 - 2;

anImmutableVar++; // illegal
```

```js
// Declare a variable.
let mutableVar = 1;

// Assign a value to the variable
mutableVar = 1337 + 2;
```

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/variables/variables.md)

---

# Variables & Types

- Assignment is not restricted by typing
- Nor previous assignments

<br/>

```js
const legit = 123;
const varFn = () => {};
const myArr = [1, 2, 3];
const unlimitedPower = [1, '2', 0b11, () => 2 + +'2', [1, 1, 1, 1, 1]];
const aString = 'Smooth';
```

<br/>

```js
let myFn = (name) => 'hello ' + name;
myFn('Jane'); // "hello Jane"
myFn = 'pwnd';
myFn('Jane'); // -> Exception
```

---

# Variables & Types

A side note about scope...

```js
{
  // Scope A
  // a is only visible here
  const a = 1;

  {
    // Scope B,
    // a and b is visible/accessible in this scope.
    const b = 2;

    {
      // Scope C
      // a, b, and c are all visible here
      const c = 3;
    }
  }
}
```

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/variables/variables.md#constlet-and-scopes)

---

# Variables & Types

JS defines seven built-in types:

- null
- undefined
- boolean
- number
- string
- object
- symbol (added in ES6)

All of the above (except object) are called "primitives"

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/data-types/data-types.md)

---

# Variables & Types

- In JS variables doesn't have types, instead values have types
- Type inspection
- Variable -> value -> Type

<br/>

```js
typeof 42 == 'number';
typeof '42' == 'string';
```

<br/>

```js
let myVar = { a: 1 };

myVar = 1;
myVar = [1, 'two', () => 3];
```

<br/>

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/data-types/data-types.md#types)

---

# Variables & Types

- Arrays
- JS allows us to place any value at any position in a given array
- Any type at any position at any time (if you want...)

<br/>

```js
const arr = [1, '2', () => 3, [4, 5]];

arr.length; // 4
arr[0]; // 1
arr[1]; // '2'
arr[2](); // 3
arr[3][1]; // 5
```

<br/>

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/data-types/data-types.md#arrays)

---

# Variables & Types

- String
- Not an array of chars
- A string is a string...
- However, you can access individual characters with subscript `[i]`

<br/>

```js
const message = 'Hello';
const messageArr = ['H', 'e', 'l', 'l', 'o'];

const message === messageArr // false
const message === messageArr.join('') // true

message[0] === messageArr[0] // true

Array.from(message) // ['H', 'e', 'l', 'l', 'o'];
Array.from(message) === messageArr // false, since we actually compare a reference in this case.
```

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/data-types/data-types.md#string)

---

# Variables & Types

- String Interpolation

<br/>

```js
const name = 'Jane doe';
const message = `hello ${name}, welcome!`;
```

<br/>

```js
const name = 'Jane doe';
const message = 'hello ' + name + ', welcome!';
```

---

# Variables & Types

- Numbers
- One and only one type
- Includes integer and decimal values

```js
28.0 === 28; // true

const a = 0.28;
const b = 0.28;
const c = 28.666;

a === b; // true

c.toFixed(0); // 28
c.toFixed(1); // 28.6
c.toFixed(2); // 28.66
c.toFixed(3); // 28.666
```

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/data-types/data-types.md#numbers)

---

# Variables & Types

- Object
- Aka: hashmaps, Dictionary

```js
const obj = { x: 1, y: 2, inner: [1, 2, 3] };
const person = { first: 'Jane', last: 'Doe', age: null };

obj.x; // 1
obj.y; // 2
obj.inner[1]; // 2

person.first; // 'Jane'
```

---

# Variables & Types

- `null`, `undefined`, and `void`
- null - had a value and doesn't anymore
- undefined - hasn't had a value yet
- void - voids any following statement

<br/>

```js
let a = null; // null
let b; // undefined

void 1; // undefined
void 1 === undefined; // true

const three = () => 3;

myFn() === 3; // true
void myFn() === 3; // false
```

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/data-types/data-types.md#null-undefined-and-void)

---

# Exercise 1

1. Types
2. Interpolation
3. Number calculations
4. Translate between number an string

<br/>

> src/exercises/1

`npm run test:1`

---

# Functions

- function name
- args
- body
- return

<br/>

```js
function name(a1, a2, ...) {
  return
}
```

<br/>

```js
const name = (a1, a2, ...) => {
  return;
};
```

---

# Functions

```js
function sum(arr) {
  const sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

// implicit return
const sum = (arr) => arr.reduce((acc, n) => (acc += n));

// explicit return
const sum = (arr) => {
  return arr.reduce((acc, n) => (acc += n));
};
```

---

# Functions

```js
function f1(one, two, three, ...args) {
  return {
    defined: one + two + three,
    rest: args,
  };
}

f1(3, 4, 5, 6, 7); // { "defined": 12, "rest": [6,7] }
```

---

# References

```js
function increment(c) {
  if (Array.isArray(c)) {
    for (let i = 0; i < c.length; i++) {
      c[i] += 1;
    }

    return;
  }

  c += 1;
}

a = [1, 2, 3];
b = 3;

increment(a);
increment(b);

a; // [2, 3, 4]
b; // 3
```

---

# Control Flow - Comparing values

- equality
- inequality
- [coercion (explicit & implicit)](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20%26%20going/ch2.md#coercion)
- `==`, `===`, `!=`, `!==`,`<`, `>`, `<=`, and `>=`

```js
const a = '42';
const b = 42;

a == b; // true
a === b; // false
```

```js
const a = 41;
const b = '42';

a < b; // true
a > b; // false
```

## [Read more](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20%26%20going/ch2.md#comparing-values)

---

# Control Flow - if

```js
const result = calculateSomething();

if (result === 42) {
  // runs if `results` is equal to 42
}

if (result == '42') {
  // runs if `results` is equal to 42 or "42"
}
```

```js
const result = calculateSomething();

if (result === 1339) {
  // if you're two steps ahead run this section
} else {
  // otherwise do this...
}
```

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/control-flows/control-flow.md)

---

# Control Flow - else if

```js
const result = calculateSomething();

if (result === 1339) {
  // if you're two steps ahead run this section
} else if (result === 1337) {
  // still cool
} else {
  // Mr.noob
}
```

---

# Control Flow - ternary

```js
expression ? true : false;
```

<br/>

```js
// Example A
let message;

if (result === 1339) {
  message = 'two steps ahead';
} else {
  message = 'scrubnub';
}

//  Example B
const message = result === 1339 ? 'two steps ahead' : 'scrubnub';
```

---

# Control Flow - for

```js
let message = '';

for (let i = 0; i < 5; i++) {
  message += i;
  doSomethingMore();
}

message; // "01234"
```

---

# Control Flow - while

```js
let i = 0;

while (i < 5) {
  message += i;
  doSomethingMore();
  i++;
}
```

---

# Control Flow - do while

```js
let i = 0;

do {
  message += i;
  doSomethingMore();
  i++;
} while (i < 5);
```

---

# Exercise 2

1. Expressions
2. Control flow
3. Functions

> src/exercises/2

`npm run test:2`

---

# Module Imports

- Re-use code
- Simplifies refactoring

```js
// main.js
import say from './say';

function main() {
  say.hello('world');
}
```

```js
// say.js
const say = {
  hello: (name) => {
    console.log(`hello ${world}`);
  },
};

export default say;
```

[Read More](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/control-flows/modules.md)

---

# Module Imports

```js
// main.js
import say, { helper, world } from './say';

function main() {
  say.hello('m8'); // 'hello m8'
  say.hello(world()); // 'hello world'
}
```

```js
// say.js
const say = {
  hello: (name) => {
    console.log(`hello ${world}`);
  },
};

export const world = () => 'world';

export const anotherFn = () => '...';

export default say;
```

---

# Async Handlers - callback

- a function that you define, which will/might be called in the future
- it's "calling back" for some event

```js
const isGreaterThan10 = (value, callback) => {
  if (value > 10) {
    callback(null, true);

    return;
  }

  callback(new Error('Value must be greater than 10'), false);
};

isGreaterThan10(5, (err, isGreater) => {
  if (err) {
    // handle error
  }

  // do some stuff on success
});
```

---

# Async Handlers - callback

```js
const isGreaterThan10 = (value) => {
  return new Promise((resolve, reject) => {
    if (value > 10) {
      resolve(true);

      return;
    }

    reject(new Error('Value must be greater than 10'));
  });
};

async function main() {
  try {
    const isGreater = await isGreaterThan10(5);
  } catch (error) {
    // handle err
  }
}
```

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/the-basics/callbacks-promises/callbacks-promises.md#callbacks-and-promises)

---

# Async Handlers - promise vs callback

```js
fs.readFile(targetFile, (err, data) => {
  if (err) {
    console.error(err);

    return;
  }

  console.log(data);
});
```

<br/>

```js
try {
  const data = await fsp.readFile(targetFile);
} catch (error) {
  // handle error
}
```

---

# Files - Reading

```js
import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'examples/io/data/hello.dat');

// Example 1 (non-blocking)
fs.readFile(filePath, (err, data) => {
  if (err) {
    throw err;
  }

  console.log(data);
});

// Example 2 (blocking)
const data = fs.readFileSync(filePath);

// Example 3 (non-blocking)
const asyncData = await fsp.readFile(filePath);
```

---

# Files - Writing

```js
import fs from 'fs';
import path from 'path';

const targetFile = path.resolve(process.cwd(), 'examples/files/new.dat');

fs.writeFile(targetFile, 'This string will be written to file\n', (err) => {
  if (err) {
    console.log(err);
  }
});
```

[Read More](https://github.com/elva-labs/nodejs-speedrun/blob/master/io/files.md)

---

# Files - Large Files

- `fs.readFile()`, `fs.readFileSync()` and `fsPromises.readFile()` read the full content of the file in memory before returning the data
- Working with large files? Go with streams

<br/>

![stream](/stream.svg)

<br/>

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/io/buffers-streams.md)

---

# Files - Stream

- [Stream](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html)

<br/>

```js
import { resolve } from 'path';
import { createReadStream } from 'fs';

const targetFile = resolve(process.cwd(), 'examples/files/input.dat');
const stream = createReadStream(targetFile, 'utf-8');

for await (const chunk of stream) {
  console.log(chunk);
}
```

---

# Exercise 3

- read and write files
- callback & promise

> src/exercises/3

`npm run test:3`

---

# HTTP(S) - communication on the internet

> but first some prerequisites

<br/>

1. TCP (transmission control protocol) / UDP (User datagram Protocol)
2. IP (Internet Protocol)
3. HTTP(S) - Hypertext transfer protocol

<br/>

[Read more](https://github.com/elva-labs/nodejs-speedrun/blob/master/io/http.md)

---

# HTTP - communication on the internet

Request

```
> GET / HTTP/1.1
> Host: localhost:3008
> User-Agent: curl/7.81.0
> Accept: */*
>
```

Response

```
HTTP/1.1 200 OK
Content-Length: 1858
Content-Type: text/html
Date: Wed, 01 Jun 2022 13:36:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5

...all...the..data..
```

---

# HTTP - server

- [http from the stdlib](https://nodejs.org/api/http.html)

<br/>

```js
import { createServer } from 'http';

const PORT = 3008;

const server = createServer((_req, res) => {
  res.writeHead(200, 'OK', {
    'x-api-hello': 'world',
    'Content-Type': 'application/json',
  });
  res.end(
    JSON.stringify({
      data: [1, 2, 3],
    })
  );
});

server.listen(PORT);
```

---

# HTTP Server

[Handling routes using only http lib](https://github.com/elva-labs/nodejs-speedrun/blob/master/examples/http/server-with-routes.js#L62)

---

# HTTP Server using Express

```js
import express from 'express';

const app = express();
const port = 3000;

// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

[Read more](https://expressjs.com/en/guide/routing.html)

---

# HTTP Server using Express

- Middleware

```js
// application level
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});
```

```js
// router level
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id);
  res.render('special');
});

app.use('/a/simple/path', router);
```

---

# Packages

- reuse
- less work

Start a new project by running `npm init` and follow the prompt.

- see package.json

---

# Packages

Installing third-party packages

`npm install express change-case`

```json
{
  "name": "npm-example",
  "version": "1.0.0",
  "description": "A simple example of how to make use of external packages",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "change-case": "^4.1.2",
    "express": "^4.18.1"
  }
}
```

---

# Packages

```js
// index.js
import express from 'express';
import { camelCase } from 'change-case';

const app = express();

app.get('/', function (req, res) {
  res.send(camelCase(req.query.message));
});

app.listen(3000);
```

Then start the server with `npm start`

---

# Packages

In npm, we have three distinctions between dependencies:

1. [dependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#devdependencies) - this section includes dependencies which we need during runtime.
2. [dev-dependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#devdependencies) - these are dependencies we only require during build or release.
3. [peer-dependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies) - these are dependencies that we need of some specific version, but don't want to install them in our package. We express that someone that make use of our module will need to install the appropriate version, more info [here](https://nodejs.org/es/blog/npm/peer-dependencies/#the-solution-peer-dependencies).

---

# Exercise 4

- External packages
- Express server

---

# Docker & VMs

![docker-infra.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1661759935669/SLknWFnU5.png)

---

# Docker

- Process Isolation with `namespaces`
- Less duplication with `layers`
- Predictable shipping

---

# Docker

```bash
docker run hello-world
```

---

# Docker (Dockerfile)

- Outlines hos an application should be packaged
- And can give us information on hos it's meant to be executed

<br>

```docker
FROM node:slim

WORKDIR /usr/app

COPY package.json.js .
COPY src/index.js .

RUN npm i --quiet

EXPOSE 3000

CMD ["src/index.js"]

ENTRYPOINT ["node"]
```

---

# Docker Build

```
docker build -t <tag> .
docker build -t my-node-app:v1 .
```

<br>

```bash
docker build -t <tag> --build-arg <varname>=<value> .
docker build -t <tag> --build-arg TARGET='x86_64-unknown-linux-musl' .
```

---

# Docker Run

```bash
# This command will "take control" of your terminals stdout.
docker run <image:tag>

# Prevents docker from "locking" the container stdout with the terminal.
docker run -d <image:tag>

# Detatch and route traffic from `host_post` to `container_port`.
docker run -p <host_port>:<container_port> -d <image:tag>

# Detach and direct all traffic from host 80 to cotinaer 8080
docker run -p 80:8080 -d <image:tag>

# File mounts
docker run -v host_dir:location_dir -d <image:tag>

docker run -v /tmp/container-x/runtime-data:/opt/runtime-data -d <image:tag>

# Envs
docker run -e <VARIABLE_NAME>='env-value' -d <image:tag>

docker run --env-file ./env.list <image:tag>
```

---

# Docker "Debugging"

- `docker ps`
- `docker inspect <container-id>`
- `docker top <container-id>`
- `docker stats`
- `docker run -it --entrypoint=bash <image:tag>`

---

# Docker Deployment (Fargate & CDK)

> Fargate is a tool that enables us to deploy our containers on Amazon ECS without having to manage servers or clusters. In short, we tell AWS (ECS) how we want our images to be executed, and everything else is handled automatically.

<br>

```
git clone git@github.com:elva-labs/nodejs-crash-course.git
cd nodejs-crash-course/exercises/fargate
yarn install
```

---

# Docker Deployment (Fargate & CDK)

<br>

```ts
new ecs_patterns.ApplicationLoadBalancedFargateService(
  this,
  'MyFargateService',
  {
    cluster,
    desiredCount: 2,
    taskImageOptions: {
      image: ecs.ContainerImage.fromRegistry(image.imageUri),
      containerPort: 3000,
      environment: {
        NODE_HELLO: 'Hello',
      },
    },
    publicLoadBalancer: true,
  }
);
```

---

# Docker Deployment (Fargate & CDK)

<br>

- `yarn synth`
- `yarn deploy`
- `yarn destroy`

---
