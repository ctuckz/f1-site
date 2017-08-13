import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { IMapFunction, IMapCatchFunction } from "./ObservableUtils";

export abstract class PagedService<T> {

    protected abstract _url: string;
    protected _pageSize: number = 200;

    constructor(private _http: Http){ }

    getPage(offset: number): Observable<T> {
        let pageUrl: string = this._url + "?offset=" + offset + "&limit=" + this._pageSize;
        return this._http.get(pageUrl)
            .map(this.mapFunction)
            .catch(PagedService.handleError);
    }

    protected abstract mapFunction(response: Response, index: number): T;
    

    private static handleError(error: Response) : ErrorObservable {
        console.error(error);
        return Observable.throw(error);
    }
}
