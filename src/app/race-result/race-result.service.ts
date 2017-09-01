import { Injectable } from '@angular/core';
import { PagedService } from "../util/PagedService";
import { Http, Response } from "@angular/http";
import { IResult } from "../results/Result";

@Injectable()
export class RaceResultService extends PagedService<IResult[]> {
    protected _url: string;

    constructor(round: string, http: Http) {
        super(http);

        this._url = "http://ergast.com/api/f1/current/" + round + "/results.json";
    }

    protected mapFunction(response: Response, index: number): IResult[] {
        return <IResult[]>response.json().MRData.RaceTable.Races[0].Results;
    }
}
