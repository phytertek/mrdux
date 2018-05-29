"use strict";
exports.__esModule = true;
exports.concat = function () {
    var l = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        l[_i] = arguments[_i];
    }
    return function (a) { return a.concat.apply(a, l); };
};
exports.filter = function (p) { return function (a) { return a.filter(p); }; };
exports.find = function (p) { return function (a) { return a.find(p); }; };
exports.findIndex = function (p) { return function (a) { return a.findIndex(p); }; };
exports.includes = function (v, s) { return function (a) { return a.includes(v, s); }; };
exports.join = function (s) { return function (a) { return a.join(s); }; };
exports.map = function (c) { return function (a) { return a.map(c); }; };
exports.reduce = function (c, i) { return function (a) { return a.reduce(c, i); }; };
exports.reduceRight = function (c, i) { return function (a) { return a.reduceRight(c, i); }; };
exports.slice = function () {
    var c = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        c[_i] = arguments[_i];
    }
    return function (a) { return a.slice.apply(a, c); };
};
exports.sort = function (p) { return function (a) { return a.slice().sort(p); }; };
exports.indexOf = function (v) { return function (a) { return a.indexOf(v); }; };
exports.lastIndexOf = function (v) { return function (a) { return a.lastIndexOf(v); }; };
exports.reverse = function (a) { return a.slice().reverse(); };
exports.first = function (a) { return a.slice().shift(); };
exports.last = function (a) { return a.slice().pop(); };
exports.all = function (p) { return function (a) { return a.every(p); }; };
exports.any = function (p) { return function (a) { return a.some(p); }; };
exports.append = function (v) { return function (a) { return a.concat([v]); }; };
exports.prepend = function (v) { return function (a) { return a.slice().unshift(v); }; };
exports.drop = function (c) { return function (a) { return a.slice(c); }; };
exports.dropLast = function (c) { return function (a) { return a.slice(0, a.length - c); }; };
exports.take = function (c) { return function (a) { return a.slice(0, c); }; };
exports.takeLast = function (c) { return function (a) { return a.slice(a.length - c); }; };
exports.flatten = function (a) {
    return a.reduce(function (r, e) { return (Array.isArray(e) ? r.concat(exports.flatten(e)) : r.concat([e])); }, []);
};
exports.insert = function (i) { return function (v) { return function (a) { return a.slice(0, i).concat([v], a.slice(i)); }; }; };
exports.insertAll = function (i) { return function (v) { return function (a) { return a.slice(0, i).concat(v, a.slice(i)); }; }; };
exports.update = function (i) { return function (v) { return function (a) { return a.slice(0, i).concat([v], a.slice(i - 1)); }; }; };
exports.updateAll = function (i) { return function (v) { return function (a) { return a.slice(0, i).concat(v, a.slice(i - v.length)); }; }; };
exports.hasMatchIn = function (a) { return function (b) {
    return [a, b].reduce(function (rs, ea, i) {
        return rs
            ? rs
            : ea.reduce(function (r, e) { return (r ? r : !!i ? a.includes(e) : b.includes(e)); }, false);
    }, false);
}; };
