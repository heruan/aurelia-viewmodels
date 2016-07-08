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
var aurelia_persistence_1 = require("aurelia-persistence");
var aurelia_storage_1 = require("aurelia-storage");
var aurelia_components_1 = require("aurelia-components");
var ListViewModel = (function (_super) {
    __extends(ListViewModel, _super);
    function ListViewModel(collector) {
        _super.call(this);
        this.collector = collector;
    }
    ListViewModel.prototype.created = function (owningView, myView) {
        _super.prototype.created.call(this, owningView, myView);
    };
    ListViewModel.prototype.bind = function (bindingContext, overrideContext) {
        var _this = this;
        _super.prototype.bind.call(this, bindingContext, overrideContext);
        Promise.all([
            this.storage.get(this.constructor.name + ".filters").then(function (filters) { return _this.filters = filters.map(function (f) { return aurelia_persistence_1.FilterBinding.fromJSON(f); }); }, function (f) { return _this.filters = []; }),
            this.storage.get(this.constructor.name + ".customFilter").then(function (filter) { return _this.customFilter = aurelia_persistence_1.FilterBinding.fromJSON(filter); }, function (f) { return _this.customFilter = _this.collector.save("Custom"); })
        ]).then(function () { return _this.storage.get(_this.constructor.name + ".currentFilter"); }).then(function (index) {
            if (index < 0) {
                _this.activateFilter(_this.customFilter);
            }
            else {
                _this.activateFilter(_this.filters[index]);
            }
        }, function (f) { return _this.activateFilter(_this.customFilter); }).then(function () {
            [_this.customFilter].concat(_this.filters).forEach(function (filter) {
                filter.loading = true;
                _this.collector.count(filter.query).then(function (count) { return filter.count = count; }).then(function () { return filter.loading = false; });
            });
        });
    };
    ListViewModel.prototype.attached = function () {
        _super.prototype.attached.call(this);
    };
    ListViewModel.prototype.detached = function () {
        _super.prototype.detached.call(this);
    };
    ListViewModel.prototype.unbind = function () {
        _super.prototype.unbind.call(this);
        this.storage.set(this.constructor.name + ".currentFilter", this.filters.indexOf(this.currentFilter));
    };
    ListViewModel.prototype.activateFilter = function (filter) {
        this.collector.activate(filter);
        filter.loading = true;
        this.currentFilter = filter;
        this.collector.count(filter.query).then(function (count) { return filter.count = count; }).then(function () {
            filter.loading = false;
        });
    };
    ListViewModel.prototype.resetCustomFilter = function () {
        this.collector.reset();
        this.updateCustom();
    };
    ListViewModel.prototype.saveCustomFilter = function (name) {
        var filter = this.collector.save(name);
        this.filters.push(filter);
        this.storage.set(this.constructor.name + ".filters", this.filters);
        return filter;
    };
    ListViewModel.prototype.saveAndActivateCustomFilter = function () {
        var name = prompt("Filter name");
        if (name) {
            this.activateFilter(this.saveCustomFilter(name));
        }
    };
    ListViewModel.prototype.removeFilter = function (filter) {
        this.filters.splice(this.filters.indexOf(filter), 1);
        this.activateFilter(this.customFilter);
        this.storage.set(this.constructor.name + ".filters", this.filters);
    };
    ListViewModel.prototype.updateCustom = function () {
        var filter = this.collector.save("Custom");
        filter.count = this.customFilter.count;
        this.customFilter = filter;
        this.activateFilter(filter);
        this.storage.set(this.constructor.name + ".customFilter", this.customFilter);
    };
    ListViewModel.prototype.toggleSorting = function (property) {
        this.collector["sorting"].toggle(property);
        this.collector.retrieve();
        this.updateCustom();
    };
    ListViewModel.prototype.scrollListener = function (event) {
        var element = event.target;
        if (!this.collector.loading && element.scrollTop === (element.scrollHeight - element.offsetHeight)) {
            this.collector.retrieveMore();
        }
    };
    ListViewModel.prototype.bindRouteTitle = function (routeConfig, params) {
        var _this = this;
        if (routeConfig.title) {
            this.title = routeConfig.title.replace(/\{([^\}]+)\}/g, function (match, path) {
                var steps = path.split(".");
                var field = steps.pop();
                for (var _i = 0, steps_1 = steps; _i < steps_1.length; _i++) {
                    var step = steps_1[_i];
                    params = params[step];
                }
                _this.bindingEngine.propertyObserver(params, field).subscribe(function (value) {
                    _this.title = routeConfig.title.replace("{" + path + "}", value);
                    routeConfig.navModel.setTitle(_this.title);
                });
                return params[field];
            });
            routeConfig.navModel.setTitle(this.title);
        }
    };
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_binding_1.BindingEngine)
    ], ListViewModel.prototype, "bindingEngine", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_security_1.SecurityContext)
    ], ListViewModel.prototype, "securityContext", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_storage_1.LocalStorage)
    ], ListViewModel.prototype, "storage", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_router_1.Router)
    ], ListViewModel.prototype, "router", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_i18n_1.I18N)
    ], ListViewModel.prototype, "i18n", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_dialog_1.DialogService)
    ], ListViewModel.prototype, "dialogService", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_push_1.NotificationManager)
    ], ListViewModel.prototype, "notificationManager", void 0);
    __decorate([
        aurelia_property_injection_1.autoinject, 
        __metadata('design:type', aurelia_progress_1.ProgressIndicator)
    ], ListViewModel.prototype, "progressIndicator", void 0);
    __decorate([
        aurelia_property_injection_1.newInstance(aurelia_validation_1.ValidationController), 
        __metadata('design:type', aurelia_validation_1.ValidationController)
    ], ListViewModel.prototype, "validationController", void 0);
    return ListViewModel;
}(aurelia_components_1.AbstractComponent));
exports.ListViewModel = ListViewModel;
