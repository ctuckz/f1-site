import { IDriver } from "../drivers/driver";
import { IConstructor } from "../constructors/constructor";

export interface IStanding {
    position: number,
    positionText: string,
    points: number,
    wins: number,
    Driver: IDriver,
    Constructors: IConstructor[]
}