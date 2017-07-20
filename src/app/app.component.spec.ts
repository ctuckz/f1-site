import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppModule } from "./app.module";
import { SeasonsComponent } from "./seasons/seasons.component";
import { SeasonsSortPipe } from "./seasons/seasons-sort.pipe";
import { SeasonComponent } from "./seasons/season.component";
import { StandingsComponent } from "./standings/standings.component";
import { HttpModule } from "@angular/http";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SeasonsComponent,
        SeasonsSortPipe,
        SeasonComponent,
        StandingsComponent
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
