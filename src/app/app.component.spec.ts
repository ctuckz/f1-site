import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppModule } from "./app.module";
import { SeasonsComponent } from "./seasons/seasons.component";
import { SeasonsSortPipe } from "./seasons/seasons-sort.pipe";
import { SeasonComponent } from "./seasons/season.component";
import { StandingsComponent } from "./standings/standings.component";
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";
import { StandingsSortPipe } from "./standings/standings.pipe";
import { HomeComponent } from "./home/home.component";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SeasonsComponent,
                SeasonsSortPipe,
                SeasonComponent,
                StandingsComponent,
                StandingsSortPipe,
                HomeComponent
            ],
            imports: [HttpModule, RouterTestingModule]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
