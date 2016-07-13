import {autoinject} from "aurelia-property-injection";
import {BindingEngine} from "aurelia-binding";
import {View} from "aurelia-templating";
import {Router, RouterConfiguration, RouteConfig, NavigationInstruction} from "aurelia-router";
import {RouterViewPort} from "aurelia-components";

export abstract class IndexViewPort implements RouterViewPort {

    @autoinject
    protected bindingEngine: BindingEngine;

    protected router: Router;

    protected title: string;

    public configureRouter(routerConfiguration: RouterConfiguration, router: Router): void {
        this.router = router;
    }

    public canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean> {
        return Promise.resolve(true);
    }

    public activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<any> {
        return Promise.resolve();
    }

    public canDeactivate(): Promise<boolean> {
        return Promise.resolve(true);
    }

    public deactivate(): Promise<any> {
        return Promise.resolve();
    }

    public created(owningView: View, myView: View): void {

    }

    public bind(bindingContext: Object, overrideContext?: Object): void {
    }

    public attached(): void {

    }

    public detached(): void {

    }

    public unbind(): void {

    }

    protected bindRouteTitle(routeConfig: RouteConfig, entity: Object): void {
        if (routeConfig.title) {
            this.title = routeConfig.title.replace(/\{([^\}]+)\}/g, (match, path: string) => {
                let steps = path.split(".");
                let field = steps.pop();
                for (let step of steps) {
                    entity = entity[step];
                }
                this.bindingEngine.propertyObserver(entity, field).subscribe(value => {
                    this.title = routeConfig.title.replace(`{${path}}`, value);
                    routeConfig.navModel.setTitle(this.title);
                });
                return entity[field];
            });
            routeConfig.navModel.setTitle(this.title);
        }
    }

}
