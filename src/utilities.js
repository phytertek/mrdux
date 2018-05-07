const { curry } = require('./core');

// Expects objects passed in arr to have either _id or id properties, if both exist _id is used
const mapToId = arr =>
  arr.reduce(
    (returnObj, obj) =>
      !!obj._id || !!obj.id
        ? { ...returnObj, [obj._id || obj.id]: obj }
        : returnObj,
    {}
  );
const arrMapWithId = obj =>
  Object.keys(obj).map(key => ({ ...obj[key], id: key }));
const newUid = obj => {
  const attempt = Date.now();
  return obj.hasOwnProperty(attempt) ? newUid(obj) : attempt;
};
const assignUid = curry((val, obj) => ({ ...obj, [newUid(obj)]: val }));

module.exports = {
  mapToId,
  arrMapWithId,
  newUid,
  assignUid
};
