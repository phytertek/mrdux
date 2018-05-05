const c = {};
c.curry = (fn, ...args) =>
  fn.length <= args.length
    ? fn(...args)
    : (...restArgs) => curry(fn, ...args, ...restArgs);

const cp = method => (...fns) => initialValue =>
  fns[method]((acc, fn) => fn(acc), initialValue);

c.compose = cp('reduceRight');

c.pipe = cp('reduce');

c.identity = val => val;

module.exports = c;
