import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { SeasonsSortPipe } from './seasons/seasons-sort.pipe';
import { SeasonComponent } from './seasons/season.component';
import { StandingsComponent } from './standings/standings.component';
import { StandingsSortPipe } from './standings/standings.pipe';
import { HomeComponent } from './home/home.component';
import { StandingsChartComponent } from './standings/standings-chart/standings-chart.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverAlphaSortPipe } from './drivers/driver-alpha-sort.pipe';

@NgModule({
    declarations: [
        AppComponent,
        SeasonsSortPipe,
        SeasonComponent,
        StandingsComponent,
        StandingsChartComponent,
        StandingsSortPipe,
        HomeComponent,
        StandingsChartComponent,
        DriversComponent,
        DriverAlphaSortPipe
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(
            [
                { path: "seasons/:season", component: SeasonComponent },
                { path: "drivers", component: DriversComponent },
                { path: "", component: HomeComponent },
                { path: "**", redirectTo: "", pathMatch: "full" }
            ]
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
