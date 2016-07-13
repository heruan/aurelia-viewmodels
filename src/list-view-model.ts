import {autoinject, newInstance} from "aurelia-property-injection";
import {BindingEngine} from "aurelia-binding";
import {SecurityContext} from "aurelia-security";
import {Router, RouteConfig} from "aurelia-router";
import {DialogService} from "aurelia-dialog";
import {NotificationManager} from "aurelia-push";
import {ProgressIndicator} from "aurelia-progress";
import {ValidationController} from "aurelia-validation";
import {EntityCollector, FilterBinding, Sorting} from "aurelia-persistence";
import {LocalStorage} from "aurelia-storage";
import {AbstractComponent} from "aurelia-components";
import {View} from "aurelia-templating";

export abstract class ListViewModel<E> extends AbstractComponent {

    protected collector: EntityCollector<E>;

    protected filters: FilterBinding[];

    protected customFilter: FilterBinding;

    protected currentFilter: FilterBinding;

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

    public title: string;

    public constructor(collector: EntityCollector<E>) {
        super();
        this.collector = collector;
    }

    public created(owningView: View, myView: View): void {
        super.created(owningView, myView);
    }

    public bind(bindingContext: Object, overrideContext?: Object): void {
        super.bind(bindingContext, overrideContext);
        Promise.all([
            this.storage.get<Object[]>(`${this.constructor.name}.filters`).then(filters => this.filters = filters.map(f => FilterBinding.fromJSON(f)), f => this.filters = []),
            this.storage.get<Object>(`${this.constructor.name}.customFilter`).then(filter => this.customFilter = FilterBinding.fromJSON(filter), f => this.customFilter = this.collector.save("Custom"))
        ]).then(() => this.storage.get<number>(`${this.constructor.name}.currentFilter`)).then(index => {
            if (index < 0) {
                this.activateFilter(this.customFilter);
            } else {
                this.activateFilter(this.filters[index]);
            }
        }, f => this.activateFilter(this.customFilter)).then(() => {
            [ this.customFilter ].concat(this.filters).forEach(filter => {
                filter.loading = true;
                this.collector.count(filter.query).then(count => filter.count = count).then(() => filter.loading = false);
            });
        });
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

    public activateFilter(filter: FilterBinding): void {
        this.collector.activate(filter);
        filter.loading = true;
        this.currentFilter = filter;
        this.collector.count(filter.query).then(count => filter.count = count).then(() => {
            filter.loading = false;
        });
        this.storage.set(`${this.constructor.name}.currentFilter`, this.filters.indexOf(this.currentFilter));
    }

    public resetCustomFilter(): void {
        this.collector.reset();
        this.updateCustom();
    }

    public saveCustomFilter(name: string): FilterBinding {
        let filter = this.collector.save(name);
        this.filters.push(filter);
        this.storage.set(`${this.constructor.name}.filters`, this.filters);
        return filter;
    }

    public saveAndActivateCustomFilter(): void {
        let name = prompt("Filter name");
        if (name) {
            this.activateFilter(this.saveCustomFilter(name));
        }
    }

    public removeFilter(filter: FilterBinding): void {
        this.filters.splice(this.filters.indexOf(filter), 1);
        this.activateFilter(this.customFilter);
        this.storage.set(`${this.constructor.name}.filters`, this.filters);
    }

    public updateCustom(): void {
        let filter = this.collector.save("Custom");
        filter.count = this.customFilter.count;
        this.customFilter = filter;
        this.activateFilter(filter);
        this.storage.set(`${this.constructor.name}.customFilter`, this.customFilter);
    }

    public toggleSorting(property: string): void {
        this.collector["sorting"].toggle(property);
        this.collector.retrieve();
        this.updateCustom();
    }

    public scrollListener(event: MouseEvent): void {
        let element = <HTMLElement> event.target;
        if (!this.collector.loading && element.scrollTop === (element.scrollHeight - element.offsetHeight)) {
            this.collector.retrieveMore();
        }
    }

    protected bindRouteTitle(routeConfig: RouteConfig, params: Object): void {
        if (routeConfig.title) {
            this.title = routeConfig.title.replace(/\{([^\}]+)\}/g, (match, path: string) => {
                let steps = path.split(".");
                let field = steps.pop();
                for (let step of steps) {
                    params = params[step];
                }
                this.bindingEngine.propertyObserver(params, field).subscribe(value => {
                    this.title = routeConfig.title.replace(`{${path}}`, value);
                    routeConfig.navModel.setTitle(this.title);
                });
                return params[field];
            });
            routeConfig.navModel.setTitle(this.title);
        }
    }

}
