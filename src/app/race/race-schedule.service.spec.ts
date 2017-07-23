import { TestBed, inject, async } from '@angular/core/testing';

import { RaceScheduleService } from './race-schedule.service';
import { HttpModule, Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { IRace } from "./race";
import { ISeason } from "../seasons/season";

function createRaceScheduleService(http: Http) {
  return new RaceScheduleService(http, "2008", "1");
}

describe('RaceScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: RaceScheduleService,
        useFactory: createRaceScheduleService,
        deps: [Http]
      }],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([RaceScheduleService], (service: RaceScheduleService) => {
    expect(service).toBeTruthy();
  }));

  it('should return one race', inject([RaceScheduleService], (service: RaceScheduleService) => {
    let obs: Observable<IRace[]> = service.getPage(0);
    obs.subscribe(
      races => expect(races.length).toEqual(1),
      error => fail(error)
    );
  }));

  it('should return the correct race', async(inject([RaceScheduleService], (service: RaceScheduleService) => {
    let obs: Observable<IRace[]> = service.getPage(0);
    obs.subscribe(
      races => {
        let actual: IRace = races[0];
        expect(actual).toBeTruthy();

        expect(actual.season).toBeTruthy();
        expect(actual.season.season).toEqual("2008");
        expect(actual.round).toEqual(1);
        expect(actual.date).toEqual("2008-03-16");
        expect(actual.raceName).toEqual("Australian Grand Prix");
        expect(actual.time).toEqual("04:30:00Z");
        expect(actual.Circuit).toBeTruthy();
        expect(actual.Circuit.circuitName).toEqual("Albert Park Grand Prix Circuit");
        expect(actual.Circuit.Location).toBeTruthy();
        expect(actual.Circuit.Location.country).toEqual("Australia");
      },
      error => fail(error.toString())
    );
  })));

});
