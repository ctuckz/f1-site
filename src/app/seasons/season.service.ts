import { Injectable } from '@angular/core';
import { ISeason } from "./season";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/of";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class SeasonService {

  private _seasonsUrl = "http://ergast.com/api/f1/seasons.json";

  constructor(private _http: Http) { }

  getPage(offset: number): Observable<ISeason[]> {
    let queryString: string = "?offset=" + offset;
    return this._http.get(this._seasonsUrl + queryString)
      .map((response: Response) => {
        let seasonResponse: SeasonResponse
          = new SeasonResponse(parseInt(response.json().MRData.limit),
            parseInt(response.json().MRData.offset),
            parseInt(response.json().MRData.total),
            response.json().MRData.SeasonTable.Seasons);

        return seasonResponse.seasons;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response): ErrorObservable {
    console.error(error);
    return Observable.throw(error.text || "Unknown Server Error");
  }
}

class SeasonResponse {
  constructor(public limit: number,
    public offset: number,
    public total: number,
    public seasons: ISeason[]) { }
}
