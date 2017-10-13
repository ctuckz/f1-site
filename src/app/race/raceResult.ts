import { IRace } from "./race";
import { IResult } from "../results/result";

export interface IRaceResult extends IRace {
    Results: IResult[]
}