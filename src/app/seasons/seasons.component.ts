import { Component, OnInit } from '@angular/core';
import { ISeason } from './season';
import { SeasonService } from './season.service';

@Component({
  moduleId: module.id,
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css'],
  providers: [SeasonService]
})
export class SeasonsComponent implements OnInit {

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
          if(seasons && (seasons.length || 0) > 0){
            this.loadPage(seasons.length + offset);
          }
        },
        error => this.error = error   
      );
  }

}
