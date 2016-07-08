"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_binding_1 = require("aurelia-binding");
var IndexViewPort = (function () {
    function IndexViewPort(bindingEngine) {
        this.bindingEngine = bindingEngine;
    }
    IndexViewPort.prototype.configureRouter = function (routerConfiguration, router) {
        this.router = router;
    };
    IndexViewPort.prototype.canActivate = function (params, routeConfig, navigationInstruction) {
        return Promise.resolve(true);
    };
    IndexViewPort.prototype.activate = function (params, routeConfig, navigationInstruction) {
        return Promise.resolve();
    };
    IndexViewPort.prototype.canDeactivate = function () {
        return Promise.resolve(true);
    };
    IndexViewPort.prototype.deactivate = function () {
        return Promise.resolve();
    };
    IndexViewPort.prototype.created = function (owningView, myView) {
    };
    IndexViewPort.prototype.bind = function (bindingContext, overrideContext) {
    };
    IndexViewPort.prototype.attached = function () {
    };
    IndexViewPort.prototype.detached = function () {
    };
    IndexViewPort.prototype.unbind = function () {
    };
    IndexViewPort.prototype.bindRouteTitle = function (routeConfig, entity) {
        var _this = this;
        if (routeConfig.title) {
            this.title = routeConfig.title.replace(/\{([^\}]+)\}/g, function (match, path) {
                var steps = path.split(".");
                var field = steps.pop();
                for (var _i = 0, steps_1 = steps; _i < steps_1.length; _i++) {
                    var step = steps_1[_i];
                    entity = entity[step];
                }
                _this.bindingEngine.propertyObserver(entity, field).subscribe(function (value) {
                    _this.title = routeConfig.title.replace("{" + path + "}", value);
                    routeConfig.navModel.setTitle(_this.title);
                });
                return entity[field];
            });
            routeConfig.navModel.setTitle(this.title);
        }
    };
    IndexViewPort = __decorate([
        aurelia_dependency_injection_1.autoinject, 
        __metadata('design:paramtypes', [aurelia_binding_1.BindingEngine])
    ], IndexViewPort);
    return IndexViewPort;
}());
exports.IndexViewPort = IndexViewPort;
