import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PagedServiceSubscription } from "../util/PagedServiceSubscription";
import { RaceResultService } from "./race-result.service";
import { Http } from "@angular/http";
import { IResult } from "../results/Result";

@Component({
    moduleId: module.id,
    selector: 'app-race-result',
    templateUrl: './race-result.component.html',
    styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnChanges {

    @Input() round: string;
    results: IResult[];
    errorText: string;

    constructor(private _http: Http) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["round"] && !this.results) {
            let raceResultService = new RaceResultService(this.round, this._http);
            let raceResultSubscription = new PagedServiceSubscription<IResult[]>(raceResultService,
                (response: IResult[]) => !this.results ? this.results = response : this.results.concat(response),
                (error: any) => this.errorText = error.toString());
            raceResultSubscription.loadPage(0);
        }
    }

    public getPositionChange(result: IResult): string {
        if (!result || !result.position || !result.grid) {
            return "n/a";
        }
        let change = (parseInt(result.position) - parseInt(result.grid));
        return change == 0 ? "-" : change.toLocaleString();
    }

    public getPositionChangeCSS(result: IResult) {
        if (!result || !result.position || !result.grid) {
            return "";
        }
        let change = (parseInt(result.position) - parseInt(result.grid));
        if (change == 0) {
            return "";
        }
        else if (change < 0) {
            return "text-success";
        }
        else {
            return "text-danger";
        }
    }
}
