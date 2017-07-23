import { ICircuit } from "./circuit";
import { ISeason } from "../seasons/season";

export interface IRace {
    season: ISeason,
    round: number,
    raceName: string,
    Circuit: ICircuit,
    date: string,
    time: string

    getLocalTime(): string;
}

export class Race implements IRace {

    constructor(public season: ISeason,
        public round: number,
        public raceName: string,
        public Circuit: ICircuit,
        public date: string,
        public time: string) { }

    getLocalTime(): string {
        let date: Date = new Date(this.date + " " + this.time);
        return date.toString();
    }
}