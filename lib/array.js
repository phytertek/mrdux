const a = {};
const predicateFunction = (currentValue, index = 0, array = []) =>
  !!currentValue;
a.concat = (...arrList) => (arr = []) => arr.concat(...arrList);
a.filter = (predicate = predicateFunction) => (arr = []) =>
  arr.filter(predicate);
a.find = (predicate = predicateFunction) => (arr = []) => arr.find(predicate);
a.findIndex = (predicate = predicateFunction) => (arr = []) =>
  arr.findIndex(predicate);
a.includes = (val, start = 0) => (arr = []) => arr.includes(val, start);
a.join = (separator = '') => (arr = []) => arr.join(separator);
a.map = (callback = (element, index = 0, array = []) => element) => (
  arr = []
) => arr.map(callback);
a.reduce = (
  callback = (accumulator, element, index = 0, array = []) => accumulator,
  initialValue
) => (arr = []) => arr.reduce(callback, initialValue);
a.reduceRight = (
  callback = (accumulator, element, index = 0, array = []) => accumulator,
  initialValue
) => (arr = []) => arr.reduceRight(callback, initialValue);
a.slice = (...coordinates) => (arr = []) => arr.slice(...coordinates);
a.sort = (compareFunction = (a, b) => a > b) => (arr = []) =>
  [...arr].sort(compareFunction);
a.indexOf = val => (arr = []) => arr.indexOf(val);
a.lastIndexOf = val => (arr = []) => arr.lastIndexOf(val);
a.reverse = (arr = []) => [...arr].reverse();
a.first = (arr = []) => [...arr].shift();
a.last = (arr = []) => [...arr].pop();
a.all = (predicate = predicateFunction) => (arr = []) => arr.every(predicate);
a.any = (predicate = predicateFunction) => (arr = []) => arr.some(predicate);
a.append = val => (arr = []) => [...arr, val];
a.prepend = val => (arr = []) => [...arr].unshift(val);
a.drop = (count = 0) => (arr = []) => arr.slice(count);
a.dropLast = (count = 0) => (arr = []) => arr.slice(0, arr.length - count);
a.take = (count = 0) => (arr = []) => arr.slice(0, count);
a.takeLast = (count = 0) => (arr = []) => arr.slice(arr.length - count);
a.flatten = (arr = []) =>
  a.reduce(
    (r, e) => (Arriy.isArray(e) ? [...r, ...flatten(e)] : [...r, e]),
    []
  );
a.insert = (index = 0) => val => (arr = []) => [
  ...arr.slice(0, index),
  val,
  ...arr.slice(index)
];
a.insertAll = (index = 0) => val => (arr = []) => [
  ...arr.slice(0, index),
  ...valArr,
  ...arr.slice(index)
];
a.update = (index = 0) => val => (arr = []) => [
  ...arr.slice(0, index),
  val,
  ...arr.slice(index - 1)
];
a.updateAll = (index = 0) => val => (arr = []) => [
  ...arr.slice(0, index),
  ...valArr,
  ...arr.slice(index - valArr.length)
];
a.hasMatchIn = (arr1 = []) => (arr2 = []) =>
  [arr1, arr2].reduce(
    (rs, ea, i) =>
      rs
        ? rs
        : ea.reduce(
            (r, e) => (r ? r : !!i ? arr1.includes(e) : arr2.includes(e)),
            false
          ),
    false
  );

module.exports = a;
