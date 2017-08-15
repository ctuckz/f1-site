import { Injectable } from '@angular/core';
import { IStanding } from "../standings/standing";
import { PagedService } from "../util/PagedService";
import { IDriver } from "./driver";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DriverStandingsService {

    _url: string;

    private standingUrlBase: string = "http://ergast.com/api/f1/drivers/"
    private standingUrlEnd: string = "/driverStandings.json";

    constructor(private _http: Http,
        private driver: IDriver) {
        this._url = this.standingUrlBase + driver.driverId + this.standingUrlEnd;
    }

    getDriverStandings(): Observable<IStanding[]> {
        return this._http.get(this._url)
            .map((response: Response) => {
                let standings: IStanding[] = new Array<IStanding>(0);
                for (let driverStandings of response.json().MRData.StandingsTable.StandingsLists) {
                    standings.push(driverStandings.DriverStandings[0]);
                }

                return standings;
            });
    }

    // protected mapFunction(response: Response, index: number): IStanding[] {
    //     if (response.json().MRData.StandingsTable.StandingsLists[0]) {
    //         return <IStanding[]>response.json().MRData.StandingsTable.StandingsLists[0].DriverStandings;
    //     }
    //     else {
    //         return new Array<IStanding>(0);
    //     }
    // }

}
