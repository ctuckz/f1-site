import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SeasonStandingsService } from "./season-standings.service";
import { IStanding } from "../standings/standing";
import { ActivatedRoute, Router } from '@angular/router';
import { PagedServiceSubscription } from "../util/PagedServiceSubscription";
import { Http } from "@angular/http";

export function createSeasonStandingsService(http: Http, activatedRoute: ActivatedRoute): SeasonStandingsService {
    let season: string = activatedRoute.snapshot.params["season"];
    if (!season) {
        throw ("No season discovered from route");
    }
    return new SeasonStandingsService(http, season);
}

@Component({
    moduleId: module.id,
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css'],
    providers: [
        {
            provide: SeasonStandingsService,
            useFactory: createSeasonStandingsService,
            deps: [Http, ActivatedRoute]
        }
    ]
})
export class SeasonComponent implements OnInit {

    season: string;
    seasonStandings: IStanding[];
    errorText: string;

    constructor(private _standingsService: SeasonStandingsService,
        private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.season = this._activatedRoute.snapshot.params["season"];
        if (!this.season) {
            this.errorText = "No season discovered from route!";
        }

        let pagedServiceSubscription: PagedServiceSubscription<IStanding[]>
            = new PagedServiceSubscription<IStanding[]>(this._standingsService, (standings: IStanding[]) => this.setStandings(standings), (error: any) => this.handleError(error));
        pagedServiceSubscription.loadPage(0);
    }

    private setStandings(standings: IStanding[]): void {
        if (!this.seasonStandings) {
            this.seasonStandings = standings;
        }
        else {
            this.seasonStandings.concat(standings);
        }
    }

    private handleError(error: any): void {
        this.errorText = error;
    }
}
