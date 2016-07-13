import { BindingEngine } from "aurelia-binding";
import { SecurityContext } from "aurelia-security";
import { Router } from "aurelia-router";
import { DialogService } from "aurelia-dialog";
import { NotificationManager } from "aurelia-push";
import { ProgressIndicator } from "aurelia-progress";
import { ValidationController } from "aurelia-validation";
import { DataAccessObject } from "aurelia-persistence";
import { LocalStorage } from "aurelia-storage";
import { AbstractComponent } from "aurelia-components";
import { View } from "aurelia-templating";
export declare abstract class CardViewModel<E> extends AbstractComponent {
    protected bindingEngine: BindingEngine;
    protected securityContext: SecurityContext;
    protected storage: LocalStorage;
    protected router: Router;
    protected dialogService: DialogService;
    protected notificationManager: NotificationManager;
    protected progressIndicator: ProgressIndicator;
    protected validationController: ValidationController;
    protected dataAccessObject: DataAccessObject<E>;
    protected entity: E;
    constructor(dataAccessObject: DataAccessObject<E>);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext?: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
}
