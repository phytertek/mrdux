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
// Expects objects passed in arr to have wither an id or _id property. If both exist _id is used
exports.mapToId = function (arr) {
    return arr.reduce(function (r, o) {
        return (o._id || o.id ? __assign({}, r, (_a = {}, _a[o._id || o.id] = o, _a)) : r);
        var _a;
    }, {});
};
exports.appMapWithId = function (obj) {
    return Object.keys(obj).map(function (key) { return (__assign({}, obj[key], { id: key })); });
};
var newUid = function (obj) {
    var attempt = Date.now();
    return obj.hasOwnProperty(attempt.toString())
        ? newUid(obj)
        : attempt.toString();
};
exports.assignUid = core_1.curry(function (val, obj) {
    return (__assign({}, obj, (_a = {}, _a[newUid(obj).toString()] = val, _a)));
    var _a;
});
