"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
exports.curry = function (f) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    return f.length <= a.length ? f.apply(void 0, a) : function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
        return exports.curry.apply(void 0, [f].concat(a, r));
    };
};
exports.curryModule = function (o) {
    return Object.keys(o).reduce(function (r, k) {
        return (tslib_1.__assign({}, r, (_a = {}, _a[k] = exports.curry(o[k]), _a)));
        var _a;
    }, {});
};
var cp = function (m) { return function () {
    var f = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        f[_i] = arguments[_i];
    }
    return function (i) { return f[m](function (a, fn) { return fn(a); }, i); };
}; };
exports.compose = cp('reduceRight');
exports.pipe = cp('reduce');
exports.identity = function (v) { return v; };
