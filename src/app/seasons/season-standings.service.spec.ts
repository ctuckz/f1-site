import { TestBed, inject } from '@angular/core/testing';

import { SeasonStandingsService } from './season-standings.service';
import { IStanding } from "../standings/standing";
import { Observable } from "rxjs/Observable";
import { Http, HttpModule } from "@angular/http";

describe('SeasonStandingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeasonStandingsService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([SeasonStandingsService], (service: SeasonStandingsService) => {
    expect(service).toBeTruthy();
  }));

  it('should return results', inject([SeasonStandingsService], (service: SeasonStandingsService) => {
    let actualObs:Observable<IStanding[]> = service.getPage("2008", 0);
    actualObs.subscribe(
      standings => 
      {
        expect(standings.length).toEqual(22);
        expect(standings[0].driver.driverId).toEqual("hamilton");
      }
    );
  }));

  it('should page results', inject([SeasonStandingsService], (service: SeasonStandingsService) => {
    let actualObs:Observable<IStanding[]> = service.getPage("2008", 21);
    actualObs.subscribe(
      standings => 
      {
        expect(standings.length).toEqual(1);
        expect(standings[0].driver.familyName).toEqual("davidson");
      }
    );
  }));
});
