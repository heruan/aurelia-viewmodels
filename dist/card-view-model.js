"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_property_injection_1 = require("aurelia-property-injection");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_security_1 = require("aurelia-security");
var aurelia_router_1 = require("aurelia-router");
var aurelia_i18n_1 = require("aurelia-i18n");
var aurelia_dialog_1 = require("aurelia-dialog");
var aurelia_push_1 = require("aurelia-push");
var aurelia_progress_1 = require("aurelia-progress");
var aurelia_validation_1 = require("aurelia-validation");
var aurelia_storage_1 = require("aurelia-storage");
var aurelia_components_1 = require("aurelia-components");
var CardViewModel = (function (_super) {
    __extends(CardViewModel, _super);
    function CardViewModel() {
        _super.call(this);
    }
    CardViewModel.prototype.created = function (owningView, myView) {
        _super.prototype.created.call(this, owningView, myView);
    };
    CardViewModel.prototype.bind = function (bindingContext, overrideContext) {
        _super.prototype.bind.call(this, bindingContext, overrideContext);
    };
    CardViewModel.prototype.attached = function () {
        _super.prototype.attached.call(this);
    };
    CardViewModel.prototype.detached = function () {
        _super.prototype.detached.call(this);
    };
    CardViewModel.prototype.unbind = function () {
        _super.prototype.unbind.call(this);
    };
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_binding_1.BindingEngine)
    ], CardViewModel.prototype, "bindingEngine", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_security_1.SecurityContext)
    ], CardViewModel.prototype, "securityContext", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_storage_1.LocalStorage)
    ], CardViewModel.prototype, "storage", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_router_1.Router)
    ], CardViewModel.prototype, "router", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_i18n_1.I18N)
    ], CardViewModel.prototype, "i18n", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_dialog_1.DialogService)
    ], CardViewModel.prototype, "dialogService", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_push_1.NotificationManager)
    ], CardViewModel.prototype, "notificationManager", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_progress_1.ProgressIndicator)
    ], CardViewModel.prototype, "progressIndicator", void 0);
    __decorate([
        aurelia_property_injection_1.newInstance(aurelia_validation_1.ValidationController), 
        __metadata('design:type', aurelia_validation_1.ValidationController)
    ], CardViewModel.prototype, "validationController", void 0);
    return CardViewModel;
}(aurelia_components_1.AbstractComponent));
exports.CardViewModel = CardViewModel;
