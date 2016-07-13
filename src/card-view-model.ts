import {autoinject, newInstance} from "aurelia-property-injection";
import {BindingEngine} from "aurelia-binding";
import {SecurityContext} from "aurelia-security";
import {Router, RouteConfig} from "aurelia-router";
import {DialogService} from "aurelia-dialog";
import {NotificationManager} from "aurelia-push";
import {ProgressIndicator} from "aurelia-progress";
import {ValidationController} from "aurelia-validation";
import {DataAccessObject} from "aurelia-persistence";
import {LocalStorage} from "aurelia-storage";
import {AbstractComponent} from "aurelia-components";
import {View} from "aurelia-templating";

export abstract class CardViewModel<E> extends AbstractComponent {

    @autoinject
    protected bindingEngine: BindingEngine;

    @autoinject
    protected securityContext: SecurityContext;

    @autoinject
    protected storage: LocalStorage;

    @autoinject
    protected router: Router;

    @autoinject
    protected dialogService: DialogService;

    @autoinject
    protected notificationManager: NotificationManager;

    @autoinject
    protected progressIndicator: ProgressIndicator;

    @newInstance(ValidationController)
    protected validationController: ValidationController;

    protected dataAccessObject: DataAccessObject<E>;

    protected entity: E;

    public constructor(dataAccessObject: DataAccessObject<E>) {
        super();
        this.dataAccessObject = dataAccessObject;
    }

    public created(owningView: View, myView: View): void {
        super.created(owningView, myView);
    }

    public bind(bindingContext: Object, overrideContext?: Object): void {
        super.bind(bindingContext, overrideContext);
    }

    public attached(): void {
        super.attached();
    }

    public detached(): void {
        super.detached();
    }

    public unbind(): void {
        super.unbind();
    }

}
