import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IStanding } from "../standings/standing";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { PagedService } from "../util/PagedService";

@Injectable()
export class SeasonStandingsService extends PagedService<IStanding[]> {

    protected _url: string;

    private standingUrlBase: string = "http://ergast.com/api/f1/";
    private standingUrlEnd: string = "/driverStandings.json";

    constructor(http: Http,
        season: string) {
        super(http);
        this._url = this.standingUrlBase + season + this.standingUrlEnd;
    }

    protected mapFunction(response: Response, index: number): IStanding[] {
        if (response.json().MRData.StandingsTable.StandingsLists[0]) {
            return <IStanding[]>response.json().MRData.StandingsTable.StandingsLists[0].DriverStandings;
        }
        else {
            return new Array<IStanding>(0);
        }
    }
}
