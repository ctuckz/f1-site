import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Chart } from "chart.js";
import { IStanding } from "../standing";

@Component({
    moduleId: module.id,
    selector: 'app-standings-chart',
    templateUrl: './standings-chart.component.html',
    styleUrls: ['./standings-chart.component.css']
})
export class StandingsChartComponent implements OnChanges {

    @Input() standings: IStanding[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        for (let propName in changes) {
            if (propName == "standings" && changes[propName]) {
                this.createChart();
            }
        }
    }

    private createChart(): void {
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: this.standings.map(s => s.positionText + " " + s.Driver.code),
                datasets: [{
                    label: 'Points',
                    data: this.standings.map(s => s.points),
                    backgroundColor: this.standings.map(this.getTeamColor),
                    borderColor: this.standings.map(this.getTeamBorderColor),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            fontFamily: "'Lucida Console', Monaco, monospace"

                        }
                    }]
                },
                tooltips: {
                    enabled: false
                },
                events: [],
                legend: {
                    position: "bottom",
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        });
    }

    private getTeamColor(standing: IStanding): string {
        if (!standing) {
            return "rgba(0, 0, 0, 0.2)"
        }

        let team: string = standing.Constructors[0].constructorId;
        if (team == "mercedes") {
            return "rgba(0,207,186,0.9)";
        }
        if (team == "red_bull") {
            return "rgba(0,0,125,0.9)";
        }
        if (team == "ferrari") {
            return "rgba(195,0,0,0.9)";
        }
        if (team == "force_india") {
            return "rgba(255,8,199,0.9)";
        }
        if (team == "williams") {
            return "rgba(255,255,255,0.9)";
        }
        if (team == "mclaren") {
            return "rgba(255,123,8,0.9)";
        }
        if (team == "torro_rosso") {
            return "rgba(0,0,255,0.9)";
        }
        if (team == "haas") {
            return "rgba(108,0,0,0.9)";
        }
        if (team == "renault") {
            return "rgba(255,216,0,0.9)";
        }
        if (team == "sauber") {
            return "rgba(0,110,255,0.9)";
        }

        return "rgba(0, 0, 0, 0.2)"
    }

    private getTeamBorderColor(standing: IStanding): string {
        if (!standing) {
            return "rgba(0,0,0,0)";
        }
        if (standing.Constructors[0].constructorId == "williams") {
            return "rgba(0,0,255,1)";
        }
        return "rgba(0,0,0,0)";
    }
}
