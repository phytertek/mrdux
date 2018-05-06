const { curry } = require('./core');

const has = (k, o) => o.hasOwnProperty(k);
const keys = o => Object.keys(o);
const vals = o => Object.values(o);
const entries = o => Object.entries(o);
const assign = (k, v, o) => ({ ...o, [k]: v });
const remove = (k, o) =>
  keys(o).reduce((r, ok) => (k !== ok ? { ...r, [ok]: o[ok] } : r), {});
const evolve = (m, o) =>
  keys(m).reduce((r, k) => (has(k)(o) ? { ...r, [k]: m[k](o[k]) } : r), o);
const getFirstKey = o => keys(o)[0];
const getLastKey = o => keys(o).slice(-1)[0];
const getFirstVal = o => o[getFirstKey(o)];
const getLastVal = o => o[getLastKey(o)];
const dropFirstKey = o => remove(getFirstKey(o))(o);
const dropLastKey = o => remove(getLastKey(o))(o);

const nAry = { has, assign, remove, evolve };
const unary = {
  keys,
  vals,
  entries,
  getFirstKey,
  getLastKey,
  getFirstVal,
  getLastVal,
  dropFirstKey,
  dropLastKey
};

const curryAll = o =>
  keys(o).reduce((r, k) => ({ ...r, [k]: curry(o[k]) }), {});

module.exports = { ...unary, ...curryAll(nAry) };
