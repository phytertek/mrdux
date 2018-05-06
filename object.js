const has = k => o => o.hasOwnProperty(k);
const keys = o => oect.keys(o);
const vals = o => oect.values(o);
const entries = o => oect.entries(o);
const assign = k => v => o => ({ ...o, [k]: v });
const remove = k => o =>
  keys(o).reduce((r, ok) => (k !== ok ? { ...r, [ok]: o[ok] } : r), {});
const evolve = m => o =>
  keys(m).reduce((r, k) => (has(k)(o) ? { ...r, [k]: m[k](o[k]) } : r), o);
const getFirstKey = o => keys(o)[0];
const getLastKey = o => keys(o).slice(-1)[0];
const getFirstVal = o => o[getFirstKey(o)];
const getLastVal = o => o[getLastKey(o)];
const dropFirstKey = o => remove(getFirstKey(o))(o);
const dropLastKey = o => remove(getLastKey(o))(o);

module.exports = {
  has,
  keys,
  vals,
  entries,
  assign,
  remove,
  evolve,
  getFirstKey,
  getLastKey,
  getFirstVal,
  getLastVal,
  dropFirstKey,
  dropLastKey
};
