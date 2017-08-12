import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { SeasonsSortPipe } from './seasons/seasons-sort.pipe';
import { SeasonComponent } from './seasons/season.component';
import { StandingsComponent } from './standings/standings.component';
import { StandingsSortPipe } from './standings/standings.pipe';
import { HomeComponent } from './home/home.component';
import { StandingsChartComponent } from './standings/standings-chart/standings-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        SeasonsComponent,
        SeasonsSortPipe,
        SeasonComponent,
        StandingsComponent,
        StandingsChartComponent,
        StandingsSortPipe,
        HomeComponent,
        StandingsChartComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(
            [
                { path: "seasons/:season", component: SeasonComponent },
                { path: "seasons", component: SeasonsComponent },
                { path: "", component: HomeComponent },
                { path: "**", redirectTo: "", pathMatch: "full" }
            ]
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
