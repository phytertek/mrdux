"use strict";
var _this = this;
exports.__esModule = true;
var tslib_1 = require("tslib");
var object_1 = require("./object");
var core_1 = require("./core");
exports.createAction = core_1.curry(function (t, p) { return ({ type: t, payload: p }); });
exports.actionsFrom = function (am) {
    return object_1.keys(am).reduce(function (ac, t) {
        return (tslib_1.__assign({}, ac, (_a = {}, _a[t] = exports.createAction(t), _a)));
        var _a;
    }, {});
};
exports.reducerFrom = function (i, a) { return function (s, _a) {
    if (s === void 0) { s = i; }
    var t = _a.type, p = _a.payload;
    return object_1.has(t)(a) ? a[t](p)(s) : s;
}; };
exports.generateAsyncFlow = function (t) { return function (a) { return function (n, s, _a) {
    var p = _a.payload;
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var r, e_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    n(exports.createAction(t + "_SENT")());
                    return [4 /*yield*/, a[t](p, 'gET Auth Header Here', s)];
                case 1:
                    r = _b.sent();
                    n(exports.createAction(t + "_SUCCESS", r.data));
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    n(exports.createAction(t + "_ERROR", e_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}; }; };
exports.asyncMiddlewareFrom = function (am) { return function (s) { return function (n) { return function (a) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        n(a);
        if (object_1.has(a.type)(am))
            exports.generateAsyncFlow(a.type)(am)(n, s.getState(), a);
        return [2 /*return*/];
    });
}); }; }; }; };
exports.middlewareFrom = function (am) { return function (s) { return function (n) { return function (a) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        n(a);
        if (object_1.has(a.type)(am))
            am[a.type](n, s.getState(), a);
        return [2 /*return*/];
    });
}); }; }; }; };
