import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsChartComponent } from './standings-chart.component';

describe('StandingsChartComponent', () => {
  let component: StandingsChartComponent;
  let fixture: ComponentFixture<StandingsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandingsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
