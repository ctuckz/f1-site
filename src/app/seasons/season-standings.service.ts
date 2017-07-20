import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IStanding } from "../standings/standing";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class SeasonStandingsService {

  private standingUrlBase: string = "http://ergast.com/api/f1/";
  private standingUrlEnd: string = "/driverStandings.json";

  constructor(private _http: Http) { }

  getPage(season: string, offset: number): Observable<IStanding[]> {
    let url:string = this.standingUrlBase + season + this.standingUrlEnd;
    let queryString: string = "?offset=" + offset;

    return this._http.get(url + queryString)
      .map((response: Response) => {
        if(response.json().MRData.StandingsTable.StandingsLists[0]){
          return <IStanding[]>response.json().MRData.StandingsTable.StandingsLists[0].DriverStandings;
        }
        else {
          return new Array<IStanding>(0);
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: Response): ErrorObservable {
    console.error(error);
    return Observable.throw(error.text || "Unknown Server Error");
  }
}
