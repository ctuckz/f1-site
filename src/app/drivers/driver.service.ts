import { Injectable } from '@angular/core';
import { PagedService } from "../util/PagedService";
import { IDriver } from "./driver";
import { Http, Response } from "@angular/http";

@Injectable()
export class DriverService extends PagedService<IDriver[]>{
    protected _url: string;

    constructor(http: Http, driverId: string) {
        super(http);

        this._url = "http://ergast.com/api/f1/drivers/" + driverId + ".json";
     }

    protected mapFunction(response: Response, index: number): IDriver[] {
        if(response.json().MRData.DriverTable.Drivers){
            return <IDriver[]>response.json().MRData.DriverTable.Drivers;
        }
        else{
            return null;
        }
    }

}
