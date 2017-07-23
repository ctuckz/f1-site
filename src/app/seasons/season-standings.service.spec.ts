import { TestBed, inject } from '@angular/core/testing';

import { SeasonStandingsService } from './season-standings.service';
import { IStanding } from "../standings/standing";
import { Observable } from "rxjs/Observable";
import { Http, HttpModule, ConnectionBackend } from "@angular/http";
import { SeasonComponent } from "./season.component";

export function createSeasonStandingsService(http: Http): SeasonStandingsService {
    return new SeasonStandingsService(http, "2008");
}

describe('SeasonStandingsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SeasonStandingsService,
                    useFactory: createSeasonStandingsService,
                    deps: [Http]
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be created', inject([SeasonStandingsService], (service: SeasonStandingsService) => {
        expect(service).toBeTruthy();
    }));

    it('should return results', inject([SeasonStandingsService], (service: SeasonStandingsService) => {
        let actualObs: Observable<IStanding[]> = service.getPage(0);
        actualObs.subscribe(
            standings => {
                expect(standings.length).toEqual(22);
                expect(standings[0].Driver.driverId).toEqual("hamilton");
            }
        );
    }));

    it('should page results', inject([SeasonStandingsService], (service: SeasonStandingsService) => {
        let actualObs: Observable<IStanding[]> = service.getPage(21);
        actualObs.subscribe(
            standings => {
                expect(standings.length).toEqual(1);
                expect(standings[0].Driver.familyName).toEqual("davidson");
            }
        );
    }));
});
