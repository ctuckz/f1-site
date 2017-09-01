import { ICircuit } from "../race/circuit";
import { IDriver } from "../drivers/driver";

export interface IResult {
    number: string,
    position: string,
    positionText: string,
    points: string,
    Driver: IDriver,
    grid: string,
    laps: string,
    status: string,
}