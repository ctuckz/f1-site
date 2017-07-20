import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SeasonStandingsService } from "./season-standings.service";
import { IStanding } from "../standings/standing";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
  providers: [SeasonStandingsService]
})
export class SeasonComponent implements OnInit {

  season: string;
  seasonStandings: IStanding[];
  errorText: string;

  constructor(
    private _standingsService: SeasonStandingsService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.season = this._activatedRoute.snapshot.params["season"];
    if (!this.season) {
      this.errorText = "No season discovered from route!";
    }

    this.loadPage(0);  
  }

  private loadPage(offset: number): void {
    this._standingsService.getPage(this.season, offset)
      .subscribe(
      standings => {
        if(!this.seasonStandings){
          this.seasonStandings = standings;
        }
        else{
          this.seasonStandings.concat(standings);
        }

        if (standings && (standings.length || 0) > 0) {
          this.loadPage(offset + standings.length);
        }
      },
      error => this.errorText = error
      );
  }

}
