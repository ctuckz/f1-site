import { Injectable } from '@angular/core';
import { IDriver } from "./driver";
import { PagedService } from "../util/PagedService";
import { Http, Response } from "@angular/http";

@Injectable()
export class DriversService extends PagedService<IDriver[]> {
    protected _url: string;

    private _noSeasonUrl: string = "http://ergast.com/api/f1/drivers.json";
    private _urlBase: string = "http://ergast.com/api/f1/";
    private _urlEnd: string = "/drivers.json";

    constructor(http: Http);
    constructor(http: Http, season: string);
    constructor(http: Http, season?: string) {
        super(http);

        if(!season || season.length == 0){
            this._url = this._noSeasonUrl;
        }
        else{
            this._url = this._urlBase + season + this._urlEnd;
        }
     }

    protected mapFunction(response: Response, index: number): IDriver[] {
        if (response.json().MRData.DriverTable.Drivers) {
            return <IDriver[]>response.json().MRData.DriverTable.Drivers;
        }
        else {
            return new Array<IDriver>(0);
        }
    }
}
