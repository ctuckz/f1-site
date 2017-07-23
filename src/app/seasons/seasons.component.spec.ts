import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsComponent } from './seasons.component';
import { StandingsComponent } from "../standings/standings.component";
import { HttpModule } from "@angular/http";
import { SeasonsSortPipe } from "./seasons-sort.pipe";
import { RouterTestingModule } from "@angular/router/testing";
import { StandingsSortPipe } from "../standings/standings.pipe";

describe('SeasonsComponent', () => {
    let component: SeasonsComponent;
    let fixture: ComponentFixture<SeasonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SeasonsComponent, StandingsComponent, SeasonsSortPipe, StandingsSortPipe],
            imports: [HttpModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SeasonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
