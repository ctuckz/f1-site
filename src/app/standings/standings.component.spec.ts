import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsComponent } from './standings.component';
import { StandingsSortPipe } from "./standings.pipe";

describe('StandingsComponent', () => {
    let component: StandingsComponent;
    let fixture: ComponentFixture<StandingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StandingsComponent, StandingsSortPipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StandingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
