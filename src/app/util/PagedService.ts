import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { IMapFunction, IMapCatchFunction } from "./ObservableUtils";

export abstract class PagedService<T> {

    protected abstract _url: string;

    constructor(private _http: Http){ }

    getPage(offset: number): Observable<T> {
        let pageUrl: string = this._url + "?offset=" + offset;
        return this._http.get(pageUrl)
            .map(this.mapFunction)
            .catch(PagedService.handleError);
    }

    protected abstract mapFunction(response: Response, index: number): T;
    

    private static handleError(error: Response) : ErrorObservable {
        console.error(error);
        return Observable.throw(error.text || "Unknown Server Error");
    }
}
