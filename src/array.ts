export const concat = (...l) => a => a.concat(...l);
export const filter = p => a => a.filter(p);
export const find = p => a => a.find(p);
export const findIndex = p => a => a.findIndex(p);
export const includes = (v, s) => a => a.includes(v, s);
export const join = s => a => a.join(s);
export const map = c => a => a.map(c);
export const reduce = (c, i) => a => a.reduce(c, i);
export const reduceRight = (c, i) => a => a.reduceRight(c, i);
export const slice = (...c) => a => a.slice(...c);
export const sort = p => a => [...a].sort(p);
export const indexOf = v => a => a.indexOf(v);
export const lastIndexOf = v => a => a.lastIndexOf(v);
export const reverse = a => [...a].reverse();
export const first = a => [...a].shift();
export const last = a => [...a].pop();
export const all = p => a => a.every(p);
export const any = p => a => a.some(p);
export const append = v => a => [...a, v];
export const prepend = v => a => [...a].unshift(v);
export const drop = c => a => a.slice(c);
export const dropLast = c => a => a.slice(0, a.length - c);
export const take = c => a => a.slice(0, c);
export const takeLast = c => a => a.slice(a.length - c);
export const flatten = a =>
  a.reduce(
    (r, e) => (Array.isArray(e) ? [...r, ...flatten(e)] : [...r, e]),
    []
  );
export const insert = i => v => a => [...a.slice(0, i), v, ...a.slice(i)];
export const insertAll = i => v => a => [...a.slice(0, i), ...v, ...a.slice(i)];
export const update = i => v => a => [...a.slice(0, i), v, ...a.slice(i - 1)];
export const updateAll = i => v => a => [
  ...a.slice(0, i),
  ...v,
  ...a.slice(i - v.length)
];
export const hasMatchIn = a => b =>
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
