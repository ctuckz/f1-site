import { Component, OnInit } from '@angular/core';
import { ISeason } from "./seasons/season";
import { SeasonService } from "./seasons/season.service";
import { DriversService } from "./drivers/drivers.service";
import { IDriver } from "./drivers/driver";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SeasonService, DriversService]
})
export class AppComponent implements OnInit {
    title = 'app';
    seasons: ISeason[] = new Array<ISeason>(0);
    drivers: IDriver[] = new Array<IDriver>(0);
    error: string;

    constructor(private _seasonService: SeasonService, private _dirversService: DriversService) { }

    ngOnInit() {
        this.loadSeasonsPage(0);
        this.loadDriversPage(0);
    }

    private loadSeasonsPage(offset: number): void {
        this._seasonService.getPage(offset)
            .subscribe(
            seasons => {
                this.seasons = this.seasons.concat(seasons);
                if (seasons && (seasons.length || 0) > 0) {
                    this.loadSeasonsPage(seasons.length + offset);
                }
            },
            error => this.error = error
            );
    }

    private loadDriversPage(offset: number): void {
        this._dirversService.getPage(offset)
            .subscribe(
            drivers => {
                this.drivers = this.drivers.concat(drivers);
                if (drivers && (drivers.length || 0) > 0) {
                    this.loadDriversPage(drivers.length + offset);
                }
            },
            error => this.error = error
            );
    }
}
