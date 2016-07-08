import { RouteConfig, NavigationInstruction } from "aurelia-router";
import { ViewPort } from "aurelia-components";
import { ListViewModel } from "./list-view-model";
export declare abstract class ListViewPort<E> extends ListViewModel<E> implements ViewPort {
    canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean>;
    activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<any>;
    canDeactivate(): Promise<boolean>;
    deactivate(): Promise<any>;
}
