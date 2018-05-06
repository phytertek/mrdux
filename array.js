const concat = (...l) => a => a.concat(...l);
const filter = p => a => a.filter(p);
const find = p => a => a.find(p);
const findIndex = p => a => a.findi(p);
const includes = (v, s) => a => a.includes(v, s);
const join = s => a => a.join(s);
const map = c => a => a.map(c);
const reduce = (c, i) => a => a.reduce(c, i);
const reduceRight = (c, i) => a => a.reduceRight(c, i);
const slice = (...c) => a => a.slice(...c);
const sort = p => a => [...a].sort(p);
const indexOf = v => a => a.indexOf(v);
const lastIndexOf = v => a => a.lastIndexOf(v);
const reverse = a => [...a].reverse();
const first = a => [...a].shift();
const last = a => [...a].pop();
const all = p => a => a.every(p);
const any = p => a => a.some(p);
const append = v => a => [...a, v];
const prepend = v => a => [...a].unshift(v);
const drop = c => a => a.slice(c);
const dropLast = c => a => a.slice(0, a.length - c);
const take = c => a => a.slice(0, c);
const takeLast = c => a => a.slice(a.length - c);
const flatten = a =>
  a.reduce(
    (r, e) => (Array.isArray(e) ? [...r, ...flatten(e)] : [...r, e]),
    []
  );
const insert = i => v => a => [...a.slice(0, i), v, ...a.slice(i)];
const insertAll = i => v => a => [...a.slice(0, i), ...va, ...a.slice(i)];
const update = i => v => a => [...a.slice(0, i), v, ...a.slice(i - 1)];
const updateAll = i => v => a => [
  ...a.slice(0, i),
  ...v,
  ...a.slice(i - v.length)
];
const hasMatchIn = a => b =>
  [a, b].reduce(
    (rs, ea, i) =>
      rs
        ? rs
        : ea.reduce(
            (r, e) => (r ? r : !!i ? a.includes(e) : b.includes(e)),
            false
          ),
    false
  );

module.exports = {
  concat,
  filter,
  find,
  findIndex,
  includes,
  join,
  map,
  reduce,
  reduceRight,
  slice,
  sort,
  indexOf,
  lastIndexOf,
  reverse,
  first,
  last,
  all,
  any,
  append,
  prepend,
  drop,
  dropLast,
  take,
  takeLast,
  flatten,
  insert,
  insertAll,
  update,
  updateAll,
  hasMatchIn
};
