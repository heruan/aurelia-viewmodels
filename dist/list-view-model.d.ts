import { BindingEngine } from "aurelia-binding";
import { SecurityContext } from "aurelia-security";
import { Router, RouteConfig } from "aurelia-router";
import { DialogService } from "aurelia-dialog";
import { NotificationManager } from "aurelia-push";
import { ProgressIndicator } from "aurelia-progress";
import { ValidationController } from "aurelia-validation";
import { EntityCollector, FilterBinding } from "aurelia-persistence";
import { LocalStorage } from "aurelia-storage";
import { AbstractComponent } from "aurelia-components";
import { View } from "aurelia-templating";
export declare abstract class ListViewModel<E> extends AbstractComponent {
    protected collector: EntityCollector<E>;
    protected filters: FilterBinding[];
    protected customFilter: FilterBinding;
    protected currentFilter: FilterBinding;
    protected bindingEngine: BindingEngine;
    protected securityContext: SecurityContext;
    protected storage: LocalStorage;
    protected router: Router;
    protected dialogService: DialogService;
    protected notificationManager: NotificationManager;
    protected progressIndicator: ProgressIndicator;
    protected validationController: ValidationController;
    title: string;
    constructor(collector: EntityCollector<E>);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext?: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    activateFilter(filter: FilterBinding): void;
    resetCustomFilter(): void;
    saveCustomFilter(name: string): FilterBinding;
    saveAndActivateCustomFilter(): void;
    removeFilter(filter: FilterBinding): void;
    updateCustom(): void;
    toggleSorting(property: string): void;
    scrollListener(event: MouseEvent): void;
    protected bindRouteTitle(routeConfig: RouteConfig, params: Object): void;
}
