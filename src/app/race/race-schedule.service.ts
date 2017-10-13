import { Injectable } from '@angular/core';
import { IRace, Race } from "./race";
import { PagedService } from "../util/PagedService";
import { Http, Response } from "@angular/http";
import { ICircuit } from "./circuit";
import { ISeason } from "../seasons/season";
import { Server } from '../util/server';

@Injectable()
export class RaceScheduleService extends PagedService<IRace[]> {

    protected _url: string;

    constructor(http: Http, season: string, round: string) {
        super(http);

        this._url = Server.baseUrl + "/api/f1/" + season + "/" + round + ".json";
    }

    protected mapFunction(response: Response, index: number): IRace[] {
        let json = response.json();
        if (json.MRData.RaceTable) {
            let races: Race[] = new Array<Race>(0);
            for (let i = 0; i < json.MRData.RaceTable.Races.length; i++) {
                let item: any = json.MRData.RaceTable.Races[i];
                let race: Race = new Race(<ISeason>{ season: item.season }, parseInt(item.round), item.raceName, <ICircuit>item.Circuit, item.date, item.time);
                races.push(race);
            }
            return races;
        }
        return new Array<IRace>(0);
    }
}
