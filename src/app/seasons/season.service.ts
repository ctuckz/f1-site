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
import { PagedService } from "../util/PagedService";
import { Server } from '../util/server';

@Injectable()
export class SeasonService extends PagedService<ISeason[]> {

    protected _url: string = Server.baseUrl + "/api/f1/seasons.json";

    constructor(_http: Http) {
        super(_http);
    }

    protected mapFunction(response: Response, index: number): ISeason[] {
        let seasonResponse: SeasonResponse
            = new SeasonResponse(parseInt(response.json().MRData.limit),
                parseInt(response.json().MRData.offset),
                parseInt(response.json().MRData.total),
                response.json().MRData.SeasonTable.Seasons);

        return seasonResponse.seasons;
    }
}

class SeasonResponse {
    constructor(public limit: number,
        public offset: number,
        public total: number,
        public seasons: ISeason[]) { }
}
