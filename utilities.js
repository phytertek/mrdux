"use strict";
var _this = this;
exports.__esModule = true;
var tslib_1 = require("tslib");
var core_1 = require("./core");
// Expects objects passed in arr to have wither an id or _id property. If both exist _id is used
exports.mapToId = function (arr) {
    return arr.reduce(function (r, o) {
        return (o._id || o.id ? tslib_1.__assign({}, r, (_a = {}, _a[o._id || o.id] = o, _a)) : r);
        var _a;
    }, {});
};
exports.appMapWithId = function (obj) {
    return Object.keys(obj).map(function (key) { return (tslib_1.__assign({}, obj[key], { id: key })); });
};
var newUid = function (obj) {
    var attempt = Date.now();
    return obj.hasOwnProperty(attempt.toString())
        ? newUid(obj)
        : attempt.toString();
};
exports.assignUid = core_1.curry(function (val, obj) {
    return (tslib_1.__assign({}, obj, (_a = {}, _a[newUid(obj).toString()] = val, _a)));
    var _a;
});
exports.createHttpActions = function (api, root, axios) {
    var createAction = function (verb) { return function (route, payload, auth) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios[verb](api + "/" + root + "/" + route, payload, {
                        headers: {
                            headers: auth ? { Authorization: auth } : {}
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }; };
    encodeURIComponent;
    return [
        { verb: 'get' },
        { verb: 'post' },
        { verb: 'put' },
        { verb: 'delete' },
        { verb: 'patch' },
        { verb: 'head' }
    ].reduce(function (ao, v) {
        return (tslib_1.__assign({}, ao, (_a = {}, _a[v.verb] = createAction(v.verb), _a)));
        var _a;
    });
};
