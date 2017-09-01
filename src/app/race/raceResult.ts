import { IRace } from "./race";
import { IResult } from "../results/Result";

export interface IRaceResult extends IRace {
    Results: IResult[]
}