import { Component, OnInit } from '@angular/core';
import { IRace, Race } from "../race/race";
import { ICircuit } from "../race/circuit";

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nextRace: IRace

  constructor() {
    let circuit: ICircuit = { "circuitId": "TestID", "circuitName": "Test Circuit" };
    this.nextRace = new Race(null, 1, "TestRace", circuit, "2017-07-30", "12:00:00Z");
  }

  ngOnInit() {
  }

}
