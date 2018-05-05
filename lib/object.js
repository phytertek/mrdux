const o = {};
o.has = (key = '') => (obj = {}) => obj.hasOwnProperty(key);
o.keys = (obj = {}) => Object.keys(obj);
o.vals = (obj = {}) => Object.values(obj);
o.entries = (obj = {}) => Object.entries(obj);
o.assign = (key = '') => val => (obj = {}) => ({ ...obj, [key]: val });
o.remove = (key = '') => (obj = {}) =>
  keys(obj).reduce(
    (returnObj, objKey) =>
      key !== objKey ? { ...returnObj, [objKey]: obj[objKey] } : returnObj,
    {}
  );
o.evolve = module => (obj = {}) =>
  keys(module).reduce(
    (returnObj, key) =>
      has(key)(obj)
        ? { ...returnObj, [key]: module[key](obj[key]) }
        : returnObj,
    obj
  );
o.getFirstKey = (obj = {}) => keys(obj)[0];
o.getLastKey = (obj = {}) => keys(obj).slice(-1)[0];
o.getFirstVal = (obj = {}) => obj[getFirstKey(obj)];
o.getLastVal = (obj = {}) => obj[getLastKey(obj)];
o.dropFirstKey = (obj = {}) => remove(getFirstKey(obj))(obj);
o.dropLastKey = (obj = {}) => remove(getLastKey(obj))(obj);

module.exports = o;
