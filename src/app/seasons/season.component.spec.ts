import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonComponent } from './season.component';
import { StandingsComponent } from "../standings/standings.component";
import { StandingsSortPipe } from "../standings/standings.pipe";
import { HttpModule, Http } from "@angular/http";
import { SeasonStandingsService } from "./season-standings.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { SeasonsSortPipe } from "./seasons-sort.pipe";

describe('SeasonComponent', () => {
    let component: SeasonComponent;
    let fixture: ComponentFixture<SeasonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SeasonComponent, StandingsComponent, StandingsSortPipe],
            imports: [HttpModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: { season: "2008" }
                        }
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SeasonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
