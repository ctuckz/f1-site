import { ISubscribeSetValueFunction, ISubscribeSetErrorFunction } from "./ObservableUtils";
import { Observable } from "rxjs/Observable";
import { PagedService } from "./PagedService";

export class PagedServiceSubscription<T extends Array<any>> {

    constructor(private _pagedService: PagedService<T>,
        private _subscribeSetValueFunction: ISubscribeSetValueFunction<T>,
        private _errorFunction: ISubscribeSetErrorFunction) { }

    loadPage(offset: number): void {
        if (offset < 0) {
            throw ("Cannot subscribe - offset must be positive, but was " + offset + ".");
        }

        this._pagedService.getPage(offset)
            .subscribe(
            value => {
                this._subscribeSetValueFunction(value);

                if (value && (value.length || 0) > 0) {
                    this.loadPage(offset + value.length);
                }
            },
            error => {
                if (this._errorFunction) this._errorFunction(error);
            });
    }
}