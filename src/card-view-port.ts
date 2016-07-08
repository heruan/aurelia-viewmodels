import {RouteConfig, NavigationInstruction} from "aurelia-router";
import {StorageEngine} from "aurelia-storage";
import {ViewPort} from "aurelia-components";
import {CardViewModel} from "./card-view-model";

export abstract class CardViewPort<E> extends CardViewModel<E> implements ViewPort {

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

}
