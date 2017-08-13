import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SeasonStandingsService } from "./season-standings.service";
import { IStanding } from "../standings/standing";
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { PagedServiceSubscription } from "../util/PagedServiceSubscription";
import { Http } from "@angular/http";

@Component({
    moduleId: module.id,
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {
    season: string;
    seasonStandings: IStanding[];
    errorText: string;

    constructor(private _http: Http,
        private _activatedRoute: ActivatedRoute,
        router: Router) {
        router.events.subscribe((e: NavigationStart) => this.seasonStandings = null);
    }

    ngOnInit() {
        this.loadStandings();
    }

    private loadStandings(): void {
        this._activatedRoute.paramMap
            .map(params => params.get("season"))
            .subscribe(season => {
                this.season = season;

                let standingsService: SeasonStandingsService = new SeasonStandingsService(this._http, season);
                let pagedServiceSubscription: PagedServiceSubscription<IStanding[]>
                    = new PagedServiceSubscription<IStanding[]>(standingsService, (standings: IStanding[]) => this.setStandings(standings), (error: any) => this.handleError(error));
                pagedServiceSubscription.loadPage(0);
            });
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
