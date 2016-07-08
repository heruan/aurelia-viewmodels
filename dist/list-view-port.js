"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var list_view_model_1 = require("./list-view-model");
var ListViewPort = (function (_super) {
    __extends(ListViewPort, _super);
    function ListViewPort() {
        _super.apply(this, arguments);
    }
    ListViewPort.prototype.canActivate = function (params, routeConfig, navigationInstruction) {
        return Promise.resolve(true);
    };
    ListViewPort.prototype.activate = function (params, routeConfig, navigationInstruction) {
        return Promise.resolve();
    };
    ListViewPort.prototype.canDeactivate = function () {
        return Promise.resolve(true);
    };
    ListViewPort.prototype.deactivate = function () {
        return Promise.resolve();
    };
    return ListViewPort;
}(list_view_model_1.ListViewModel));
exports.ListViewPort = ListViewPort;
