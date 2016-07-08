import { RouteConfig, NavigationInstruction } from "aurelia-router";
import { ViewPort } from "aurelia-components";
import { CardViewModel } from "./card-view-model";
export declare abstract class CardViewPort<E> extends CardViewModel<E> implements ViewPort {
    canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean>;
    activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<any>;
    canDeactivate(): Promise<boolean>;
    deactivate(): Promise<any>;
}
