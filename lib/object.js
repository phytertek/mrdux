const has = key => obj => obj.hasOwnProperty(key);
const keys = obj => Object.keys(obj);
const vals = obj => Object.values(obj);
const entries = obj => Object.entries(obj);
const assign = key => val => obj => ({ ...obj, [key]: val });
const remove = key => obj =>
  keys(obj).reduce(
    (returnObj, objKey) =>
      key !== objKey ? { ...returnObj, [objKey]: obj[objKey] } : returnObj,
    {}
  );
const evolve = mod => obj =>
  keys(mod).reduce(
    (retrunObj, key) =>
      has(key)(obj) ? { ...retrunObj, [key]: mod[key](obj[key]) } : returnObj,
    obj
  );
const getFirstKey = obj => keys(obj)[0];
const getLastKey = obj => keys(obj).slice(-1)[0];
const getFirstVal = obj => obj[getFirstKey(obj)];
const getLastVal = obj => obj[getLastKey(obj)];
const dropFirstKey = obj => remove(getFirstKey(obj))(obj);
const dropLastKey = obj => remove(getLastKey(obj))(obj);
const arrMapWithId = obj => keys(obj).map(key => ({ ...obj[key], id: key }));
/** */

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
