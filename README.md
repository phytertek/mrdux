# M R Dux

A functional programming library designed for use with redux, written by someone who never passed a single algebra class... ever.

---

## Core

### Identity

* <b>Description:</b><br>
  Identity takes a single argument, and returns the value of that argumen. It really is that simple.

* <b>Signature:</b><br>
  `x -> x`

* <b>Example:</b><br>

```js
const { core: c } = require('mrdux');

const val = 'A Value';

// Identity just returns what is passed to it
const valIdentity = c.identity(val);
// 'A Value'
```

### Curry

* <b>Description:</b><br>
  Curry takes a function and checks how many arguments it accepts, then <i>curries</i> the function to the number of arguments. For example, lets say we have a function that takes three arguments then returns an object with those three arguments as its key/value pairs `(a, b, c) => ({ a, b, c})`, a <i>curried</i> version of that function would look more like `a => b => c => ({ a, b, c})` and now each argument can be accepted one at a time, returning a new function that accepts the next arguments, and so on until all of the arguments expected are recieved, at which point the original function is executed.

* <b>Signature:</b><br>
  `fn [, ...args] -> fn()`

* <b>Example:</b><br>

```js
const { core: c } = require('mrdux');

const aFunction = (a, b, c) => ({ a, b, c });

const aCurriedFunction = c.curry(aFunction);
// (a) => (b) => (c) => ({ a, b, c})

const callUncurried = aFunction(1, 2, 3);
// { a: 1, b: 2, c: 3 }

// Curried function can take its arguments in  many ways,
// but the ORDER they are recieved in is always the same
const callCurriedOne = aCurriedFunction(1)(2)(3);
// { a: 1, b: 2, c: 3}
const callCurriedTwo = aCurriedFunction(1, 2)(3);
// { a: 1, b: 2, c: 3}
const callCurriedThree = aCurriedFunction(1)(2, 3);
// { a: 1, b: 2, c: 3}
const callCurriedFour = aCurriedFunction(1, 2, 3);
// { a: 1, b: 2, c: 3}

// Curry can also accept more arguments after the first function argument
// that is passed.  These are applied to the curried function, until the
// number of arguments passed equals the number of arguments the original
// function expected, after which the returned value from curry is the
// returned value from the original function with the arguments applied to it.
const aCurriedFunctionWith1ArgApplied = c.curry(aFunction, 1);
// (b) => (c) => ({ a: 1, b, c})
const aCurriedFunctionWith2ArgsApplied = c.curry(aFunction, 1, 2);
// (c) => ({ a: 1, b: 2, c})
const aCurriedFunctionWithAllArgsApplied = c.curry(aFunction, 1, 2, 3);
// { a: 1, b: 2, c: 3 }
const aCurriedFunctionWithTooManyArgsApplied = c.curry(
  aFunction,
  1,
  2,
  3,
  4,
  5
);
// { a: 1, b: 2, c: 3 }
```

### Pipe and Compose

* <b>Description:</b><br>
  Pipe and Compose have basically the same functionality, in opposite orders of operation. They both take a list of unary functions as arguments then return a function which expects a single argument and returns the result of passing that value through all of the listed functions, the only difference between the two is the order in which the listed functions are applied to the value.

* <b>Signature:</b><br>
  `fns -> v -> fns(v)`

* <b>Example:</b><br>

```js
const { core: c } = require('mrdux');

// Unary functions
const f1 = v => v + '1';
const f2 = v => v + '2';
const f3 = v => v + '3';
const f4 = v => v + '4';
const f5 = v => v + '5';

// Pipe applies the functions in the order they are given
const functionPipeline = c.pipe(f1, f2, f3, f4, f5);
// (v) => f5(f4(f3(f2(f1(v)))))

const pipelineResult = functionPipeline('0');
// '012345'

// Compose applies the functions in the reverse order they are given
const functionComposition = c.compose(f1, f2, f3, f4, f5);
// (v) => f1(f2(f3(f4(f5(v)))))

const compositionResult = functionComposition('0');
// '054321'
```
