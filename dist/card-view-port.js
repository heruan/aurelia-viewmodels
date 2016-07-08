"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var card_view_model_1 = require("./card-view-model");
var CardViewPort = (function (_super) {
    __extends(CardViewPort, _super);
    function CardViewPort() {
        _super.apply(this, arguments);
    }
    CardViewPort.prototype.canActivate = function (params, routeConfig, navigationInstruction) {
        return Promise.resolve(true);
    };
    CardViewPort.prototype.activate = function (params, routeConfig, navigationInstruction) {
        return Promise.resolve();
    };
    CardViewPort.prototype.canDeactivate = function () {
        return Promise.resolve(true);
    };
    CardViewPort.prototype.deactivate = function () {
        return Promise.resolve();
    };
    return CardViewPort;
}(card_view_model_1.CardViewModel));
exports.CardViewPort = CardViewPort;
