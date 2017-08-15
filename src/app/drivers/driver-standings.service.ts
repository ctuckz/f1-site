import { Injectable } from '@angular/core';
import { IStanding } from "../standings/standing";
import { PagedService } from "../util/PagedService";
import { IDriver } from "./driver";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ICache, TimedCache } from "../util/timed-cache";

@Injectable()
export class DriverStandingsService {

    private url: string;
    private standingUrlBase: string = "http://ergast.com/api/f1/drivers/"
    private standingUrlEnd: string = "/driverStandings.json";

    private readonly cacheKey: string;

    constructor(private _http: Http,
        private _cache: TimedCache<IStanding[]>,
        private driver: IDriver) {
        this.url = this.standingUrlBase + driver.driverId + this.standingUrlEnd;
        this.cacheKey = "DriverStandings" + driver.driverId;
    }

    getDriverStandings(): Observable<IStanding[]> {
        return Observable.of(new Array<IStanding>(0));
        // let cachedStandings: IStanding[] = this._cache.get(this.cacheKey);
        // if(cachedStandings){
        //     return Observable.of(cachedStandings);
        // }

        // return this._http.get(this.url)
        //     .map((response: Response) => {
        //         let standings: IStanding[] = new Array<IStanding>(0);
        //         for (let driverStandings of response.json().MRData.StandingsTable.StandingsLists) {
        //             standings.push(driverStandings.DriverStandings[0]);
        //         }

        //         this._cache.add(this.cacheKey, standings);
        //         return standings;
        //     });
    }
}
