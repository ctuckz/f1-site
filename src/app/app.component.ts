import { Component, OnInit } from '@angular/core';
import { ISeason } from "./seasons/season";
import { SeasonService } from "./seasons/season.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SeasonService]
})
export class AppComponent implements OnInit {
    title = 'app';
    seasons: ISeason[] = new Array<ISeason>(0);
    error: string;

    constructor(private _seasonService: SeasonService) { }

    ngOnInit() {
        this.loadPage(0);
    }

    private loadPage(offset: number): void {
        this._seasonService.getPage(offset)
            .subscribe(
            seasons => {
                this.seasons = this.seasons.concat(seasons);
                if (seasons && (seasons.length || 0) > 0) {
                    this.loadPage(seasons.length + offset);
                }
            },
            error => this.error = error
            );
    }
}
