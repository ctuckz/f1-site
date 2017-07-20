import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsComponent } from './seasons.component';
import { StandingsComponent } from "../standings/standings.component";
import { HttpModule } from "@angular/http";

describe('SeasonsComponent', () => {
  let component: SeasonsComponent;
  let fixture: ComponentFixture<SeasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonsComponent, StandingsComponent],
      imports: [HttpModule]
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
