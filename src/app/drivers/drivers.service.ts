import { Injectable } from '@angular/core';
import { IDriver } from "./driver";
import { PagedService } from "../util/PagedService";
import { Http, Response } from "@angular/http";
import { Server } from '../util/server';

@Injectable()
export class DriversService extends PagedService<IDriver[]> {
    protected _url: string;

    private _noFilterUrl: string = Server.baseUrl + "/api/f1/drivers.json";
    private _urlBase: string = Server.baseUrl + "/api/f1/";
    private _urlEnd: string = "/drivers.json";

    constructor(http: Http);
    constructor(http: Http, filter: string);
    constructor(http: Http, filter?: string) {
        super(http);

        if(!filter || filter.length == 0){
            this._url = this._noFilterUrl;
        }
        else{
            this._url = this._urlBase + filter + this._urlEnd;
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
