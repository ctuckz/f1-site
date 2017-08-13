import { Injectable } from '@angular/core';
import { IDriver } from "./driver";
import { PagedService } from "../util/PagedService";
import { Http, Response } from "@angular/http";

@Injectable()
export class DriversService extends PagedService<IDriver[]> {
    protected _url: string = "http://ergast.com/api/f1/drivers.json";

    constructor(http: Http) {
        super(http);
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
