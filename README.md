# M R Dux

A functional programming library designed for use with redux, written by someone who never passed a single algebra class... _**ever**_.

---

## Core Methods

### Identity

* **Description:**  
  Identity takes a single argument, and returns the value of that argument. It really is that simple.

* **Signature:**  
  `Value -> Value`

* **Example:**

```javascript
const { core: c } = require('mrdux');

const val = 'A Value';

// Identity just returns what is passed to it
const valIdentity = c.identity(val);
// 'A Value'
```

---

### Curry

* **Description:**  
  Curry takes a function and checks how many arguments it accepts, then _**curries**_ the function to the number of arguments. For example, lets say we have a function that takes three arguments then returns an object with those three arguments as its key/value pairs `(a, b, c) => ({ a, b, c})`, a _**curried**_ version of that function would look more like `a => b => c => ({ a, b, c})` and now each argument can be accepted one at a time, returning a new function that accepts the next arguments, and so on until all of the arguments expected are recieved, at which point the original function is executed.

* **Signature:**  
  `Function -> Function`

* **Example:**

```javascript
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

---

### Pipe and Compose

* **Description:**  
  Pipe and Compose have basically the same functionality, in opposite orders of operation. They both take a list of [unary](#unary) functions as arguments then return a single [unary](#unary) function and that returns the result of passing that value through all of the listed functions, the only difference between the two is the order in which the listed functions are applied to the value.

* **Signature:**  
  `[Function] -> Value -> Function`

* **Example:**

```javascript
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

---

## Object Methods

### Has

* **Description:**  
  Has is a [curried](#curry) function that accepts a key and an object, then returns a boolean describing whether that object has that key as a property.

* **Signature:**  
  `String -> Object -> Boolean`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objHasKey = o.has('a')(obj);
// true

const objNotHasKey = o.has('z')(obj);
// false
```

---

### Keys

* **Description:**  
  Keys is a [unary](#unary) function that takes an object as its argument and returns an array of all the enumerable properties on that object.

* **Signature:**  
  `Object -> [String]`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objKeys = o.keys(obj);
// [ 'a', 'b', 'c' ]
```

---

### Vals

* **Description:**  
  Vals is a [unary](#unary) function that takes an object as its argument and returns an array of all the values of the [enumerable](#enumerable) properties on that object.

* **Signature:**  
  `Object -> [Value]`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objVals = o.vals(obj);
// [ '1', '2', '3' ]
```

---

### Entries

* **Description:**  
  Entries is a [unary](#unary) function that takes an object as its argument and returns an array of tuples made up of each [enumerable](#enumerable) key/value pair in the object.

* **Signature:**  
  `Object -> [[String, Value]]`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objEntries = o.entries(obj);
// [ ['a', '1'], ['b', '2'], ['c', '3'] ]
```

---

### Assign

* **Description:**  
  Assign is a [curried](#curry) [n-ary](#n-ary) function that accepts a key, value, and object as its arguments, then returns a copy of that object with the key/value pair added

* **Signature:**  
  `String -> Value -> Object -> Object`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objAssignD4 = o.assign('d')('4')(obj);
// { a: '1', b: '2', c: '3', d: '4' }
```

---

### Remove

* **Description:**  
  Remove is a [curried](#curry) binary function that accepts a key and an object as its arguments, then returns a copy of that object with the provided key and its corresponding value removed

* **Signature:**  
  `String -> Object -> Object`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objRemoveB2 = o.remove('b')(obj);
// { a: '1', c: '3' }
```

---

### Evolve

* **Description:**  
  Evolve is a [curried](#curry) binary function that accepts a [function module](#function-module) and an object as its arguments, then returns a copy of that object with the provided functions applied to the properties specified by the keys in the [function module](#function-module).

* **Signature:**  
  `Object -> Object -> Object`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5
};

const functionModule = {
  a: valueOfA => `a function passed value ${valueOfA}`,
  b: valueOfB => `b function passed value ${valueOfB}`,
  c: valueOfC => `c function passed value ${valueOfC}`,
  z: valueOfZ => `z function passed value ${valueOfZ}`
};

const objEvolved = o.evolve(functionModule)(obj);
/* 
{ 
  a: 'a function passed value 1',
  b: 'b function passed value 2',
  c: 'c function passed value 3',
  d: 4,
  e: 5
}
*/
```

---

### Get First Key

* **Description:**  
  A [unary](#unary) function that takes an object as an argument and returns the first [enumerable](#enumerable) key in that object.

* **Signature:**  
  `Object -> String`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objFirstKey = o.getFirstKey(obj);
// 'a'
```

---

### Get Last Key

* **Description:**  
  A [unary](#unary) function that takes an object as an argument and returns the last [enumerable](#enumerable) key in that object.

* **Signature:**  
  `Object -> String`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objLastKey = o.getLastKey(obj);
// 'c'
```

---

### Get First Value

* **Description:**  
  A [unary](#unary) function that takes an object as an argument and returns the first [enumerable](#enumerable) value in that object.

* **Signature:**  
  `Object -> Value`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objFirstValue = o.getFirstValue(obj);
// '1'
```

---

### Get Last Value

* **Description:**  
  A [unary](#unary) function that takes an object as an argument and returns the last [enumerable](#enumerable) value in that object.

* **Signature:**  
  `Object -> Value`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objLastValue = o.getLastValue(obj);
// '3'
```

---

### Drop First Key

* **Description:**  
  A [unary](#unary) function that takes an object as an argument and returns a copy of that object without the first [enumerable](#enumerable) property.

* **Signature:**  
  `Object -> Object`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objDroppedFirst = o.dropFirstKey(obj);
// { b: '2', c: '3' }
```

---

### Drop Last Key

* **Description:**  
  A [unary](#unary) function that takes an object as an argument and returns a copy of that object without the last [enumerable](#enumerable) property.

* **Signature:**  
  `Object -> Object`

* **Example:**

```javascript
const { object: o } = require('mrdux');

const obj = {
  a: '1',
  b: '2',
  c: '3'
};

const objDroppedLast = o.dropLastKey(obj);
// { a: '1', b: '2' }
```

---

---

---

## Array Methods

### Concat

* **Description:**  
  A [curried](#curry) [n-ary](#n-ary) function that takes a list of arrays as its first argument and a single array as its second, then returns the single array [appended](#append) with the values in the list of arrays.

* **Signature:**  
  `[Array] -> Array -> Array`

* **Example:**

```javascript
const { array: a } = require('mrdux');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

const arr1Arr2 = a.concat(arr2)(arr1);
// [ 1, 2, 3, 4, 5, 6]
const arr3Arr2 = a.concat(arr2)(arr3);
// [ 7, 8, 9, 4, 5, 6]
const arr1Arr2Arr3 = a.concat(arr2, arr3)(arr1);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
const arr3Arr2Arr1 = a.concat(arr2, arr1)(arr3);
// [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
```

---

### All

* **Description:**  
  A [curried](#curry) [binary](#binary) [higher order function](#higher-order-function) that takes a [predicate function](#predicate-function) as its first argument and an array as its second and returns a boolean indicating whether the [predicate function](#predicate-function) returned true with all the elements.

* **Signature:**  
  `Function -> Array -> Boolean`

* **Example:**

```javascript
const { array: a } = require('mrdux');

// Predicate function
const equalsOne = x => x === 1;

const arr1 = [1, 1, 1, 1];
const arr2 = [1, 2, 3, 4];

const truthy = a.all(equalsOne)(arr1);
// true
const falsy = a.all(equalsOne)(arr2);
// false
```

---

### Filter

* **Description:**  
  A [curried](#curry) [binary](#binary) [higher order function](#higher-order-function) that takes a [predicate function](#predicate-function) as its first argument and an array as its second and returns a copy of the array with only the elements that the [predicate function](#predicate-function) returns true with.

* **Signature:**  
  `Function -> Array -> Array`

* **Example:**

```javascript
const { array: a } = require('mrdux');

// Predicate function
const equalsOne = x => x === 1;

const arr1 = [1, 1, 1, 1];
const arr2 = [1, 2, 3, 4];

const allFilteredOut = a.filter(equalsOne)(arr1);
// []
const oneFilteredOut = a.filter(equalsOne)(arr2);
// [ 2, 3, 4 ]
```

---

### Find

* **Description:**  
  A [curried](#curry) [binary](#binary) [higher order function](#higher-order-function) that takes a [predicate function](#predicate-function) as its first argument and an array as its second and returns the first element that the [predicate function](#predicate-function) returns true with, or undefined.

* **Signature:**  
  `Function -> Array -> Value`

* **Example:**

```javascript
const { array: a } = require('mrdux');

// Predicate function
const equalsOne = x => x === 1;

const arr1 = [1, 1, 1, 1];
const arr2 = [2, 3, 4, 5];

const hasOne = a.find(equalsOne)(arr1);
// 1
const doesNotHaveOne = a.find(equalsOne)(arr2);
// undefined
```

---

### Find Index

* **Description:**  
  A [curried](#curry) [binary](#binary) [higher order function](#higher-order-function) that takes a [predicate function](#predicate-function) as its first argument and an array as its second and returns the first index that the [predicate function](#predicate-function) returns true with, or -1.

* **Signature:**  
  `Function -> Array -> Number`

* **Example:**

```javascript
const { array: a } = require('mrdux');

// Predicate function
const equalsOne = x => x === 1;

const arr1 = [2, 3, 1, 4];
const arr2 = [2, 3, 4, 5];

const hasOne = a.findIndex(equalsOne)(arr1);
// 2
const doesNotHaveOne = a.findIndex(equalsOne)(arr2);
// -1
```

---

### Includes

* **Description:**  
  A [curried](#curry) [binary](#binary) function that takes a value as its first argument and an array as its second, then returns a boolean stating whether or not the value passed is in an element in the array.

* **Signature:**  
  `Value -> Array -> Boolean`

* **Example:**

```javascript
const { array: a } = require('mrdux');

const val = 'test';
const arr1 = [1, 2, 'test', 3, 4];
const arr2 = [1, 2, 3, 4, 5];

const truthy = a.includes(val)(arr1);
// true
const falsy = a.includes(val)(arr2);
// falsy
```

---

### Join

* **Description:**  
  A [curried](#curry) [binary](#binary) function that takes a separator string as its first argument and an array as its send, then returns a single string of all elements stringified, seperated by the provided separator string.

* **Signature:**  
  `String -> Array -> String`

* **Example:**

```javascript
const { array: a } = require('mrdux');

const separatorString = ' + ';
const arr = ['a', 'b', 'c'];

const joinedArr = a.join(separatorString)(arr);
// 'a + b + c'
```

---

### Map

* **Description:**  
  A [curried](#curry) [binary](#binary) [higher order function](#higher-order-function) that takes a callback function as its first argument and an array as its second and returns an new array of the results of passing each of the array arguments elements through the callback function.

* **Signature:**  
  `Function -> Array -> Array`

* **Example:**

```javascript
const { array: a } = require('mrdux');

const increment = x => x + 1;
const arr = [1, 2, 3];

const incrementedArr = a.map(increment)(arr);
// [2, 3, 4]
```

---

### Reduce and Reduce Right

* **Description:**  
  ...

* **Signature:**  
  `Function -> Value -> Array -> Value`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Slice

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Sort

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Index Of

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Last Index Of

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Reverse

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### First

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Last

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### All

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Any

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Append

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Prepend

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Drop

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Drop Last

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Take

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Take Last

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Flatten

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Insert

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Insert All

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Update

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Update All

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

### Has Match In

* **Description:**  
  ...

* **Signature:**  
  `->`

* **Example:**

```javascript
const { array: a } = require('mrdux');
```

---

---

---

## Glossary of Terms

### Arity

* **Description:**  
  The number of arguments a function accepts

* **Example:**  
  `(a, b, c) => ({ a, b, c})` has an arity of 3

---

### Enumerable

* **Description:**  
  Technically means able to be counted. In the context of JavaScript an enumrable property on an object or an array is one that hasn't been hidden in the object's prototype.

* **Example:**

```javascript
const array = ['a', 'b', 'c'];
// The enumerable properties for array are 0, 1, and 2 (in the
// case of an array, its enumerable properties are its indices).

// An example of a non-enumerable property would be the native
// JavaScript array length property (all data types are objects after all
// :wink:)
```

---

### Function Module

* **Description:**  
  A list of functions enumerated in an object

* **Example:**

```javascript
const functionModule = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  modulo: (a, b) => a % b
};
```

---

### N-ary

* **Description:**  
  A function that takes n number of arguments. See [arity](#arity).

* **Example:**  
  `(a, b, c) => ({ a, b, c})` is a n-ary function where n is 3

---

### Unary

* **Description:**  
  Technically unary just means of one, but in the context of this library we're usually meaning a function that takes one argument.

* **Example:**  
  `(a) => a + 1` is a unary function

---

### Binary

* **Description:**  
  Technically unary just means of two, but in the context of this library we're usually meaning a function that takes two arguments.

* **Example:**  
  `(a, b) => a + b` is a binary function

---
