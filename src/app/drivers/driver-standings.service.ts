import { Injectable } from '@angular/core';
import { IStanding } from "../standings/standing";
import { PagedService } from "../util/PagedService";
import { IDriver } from "./driver";
import { Http, Response } from "@angular/http";

@Injectable()
export class DriverStandingsService extends PagedService<IStanding[]> {

    protected _url: string;

    private standingUrlBase: string = "http://ergast.com/api/f1/drivers"
    private standingUrlEnd: string = "/driverStandings.json";

    constructor(http: Http,
        driver: IDriver) {
        super(http);
        this._url = this.standingUrlBase + driver.driverId + this.standingUrlEnd;
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
