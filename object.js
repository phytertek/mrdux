"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var core_1 = require("./core");
exports.has = core_1.curry(function (k, o) {
    return o.hasOwnProperty(k);
});
exports.keys = function (o) { return Object.keys(o); };
exports.vals = function (o) { return exports.keys(o).map(function (k) { return o[k]; }); };
exports.entries = function (o) {
    return exports.keys(o).map(function (k) { return [k, o[k]]; });
};
exports.assign = core_1.curry(function (k, v, o) {
    return (__assign({}, o, (_a = {}, _a[k] = v, _a)));
    var _a;
});
exports.remove = core_1.curry(function (k, o) {
    return exports.keys(o).reduce(function (r, ok) {
        return (k !== ok ? __assign({}, r, (_a = {}, _a[ok] = o[ok], _a)) : r);
        var _a;
    }, {});
});
exports.evolve = core_1.curry(function (m, o) {
    return exports.keys(m).reduce(function (r, k) {
        return (exports.has(k)(o) ? __assign({}, r, (_a = {}, _a[k] = m[k](o[k]), _a)) : r);
        var _a;
    }, o);
});
exports.getFirstKey = function (o) { return exports.keys(o)[0]; };
exports.getLastKey = function (o) { return exports.keys(o).slice(-1)[0]; };
exports.getFirstVal = function (o) { return o[exports.getFirstKey(o)]; };
exports.getLastVal = function (o) { return o[exports.getLastKey(o)]; };
exports.dropFirstKey = function (o) { return exports.remove(exports.getFirstKey(o), o); };
exports.dropLastKey = function (o) { return exports.remove(exports.getLastKey(o), o); };
