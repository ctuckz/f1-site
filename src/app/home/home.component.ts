import { Component, OnInit } from '@angular/core';
import { IRace, Race } from "../race/race";
import { ICircuit } from "../race/circuit";
import { RaceScheduleService } from "../race/race-schedule.service";
import { Http } from "@angular/http";
import { PagedServiceSubscription } from "../util/PagedServiceSubscription";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Keys } from "../util/keys";
import { Chart } from "chart.js";
import { SeasonStandingsService } from "../seasons/season-standings.service";
import { IStanding } from "../standings/standing";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [
        {
            provide: RaceScheduleService,
            useFactory: (http: Http) => new RaceScheduleService(http, "current", "next"),
            deps: [Http]
        },
        {
            provide: SeasonStandingsService,
            useFactory: (http: Http) => new SeasonStandingsService(http, "current"),
            deps: [Http]
        }
    ]
})
export class HomeComponent implements OnInit {

    nextRace: IRace;
    currentSeasonStandings: IStanding[];
    errorText: string;

    private mapSource: string;

    constructor(private _sanitzier: DomSanitizer,
        private http: Http,
        private nextRaceScheduleService: RaceScheduleService,
        private currentSeasonStandingsService: SeasonStandingsService) { }

    ngOnInit() {
        // Load next race info
        let nextRaceSubscriptionService: PagedServiceSubscription<IRace[]>
            = new PagedServiceSubscription<IRace[]>(this.nextRaceScheduleService,
                (races: IRace[]) => this.setNextRace(races),
                (error: any) => this.setErrorText(error));
        nextRaceSubscriptionService.loadPage(0);

        // Load standings
        let standingsSubscriptionService: PagedServiceSubscription<IStanding[]>
            = new PagedServiceSubscription<IStanding[]>(this.currentSeasonStandingsService,
                (standings: IStanding[]) => this.setSeasonStandings(standings),
                (error: any) => this.setErrorText(error));
        standingsSubscriptionService.loadPage(0);
    }

    public getMapSource(): SafeResourceUrl {
        return this._sanitzier.bypassSecurityTrustResourceUrl(this.mapSource);
    }

    private setNextRace(races: IRace[]): void {
        if (!this.nextRace && races.length > 0) {
            this.nextRace = races[0];
            if (Keys.mapsAPIKey) {
                this.mapSource = "https://www.google.com/maps/embed/v1/view" +
                    "?key=" + Keys.mapsAPIKey +
                    "&center=" + this.nextRace.Circuit.Location.lat + "," + this.nextRace.Circuit.Location.long +
                    "&zoom=15" +
                    "&maptype=satellite";
            }
        }
    }

    private setSeasonStandings(standings: IStanding[]): void {
        if (!this.currentSeasonStandings) {
            this.currentSeasonStandings = standings;
        }
        else {
            this.currentSeasonStandings.concat(standings);
        }
    }

    private setErrorText(error: any) {
        if (!this.errorText) {
            this.errorText = "=> " + error.toString();
        }
        else {
            this.errorText += "\n\n=> " + error.toString();
        }
    }
}
