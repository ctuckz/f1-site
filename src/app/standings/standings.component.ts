import { Component, OnInit, Input } from '@angular/core';
import { IStanding } from "./standing";

@Component({
    moduleId: module.id,
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

    @Input() standings: IStanding[];

    constructor() { }

    ngOnInit() {
    }

}
