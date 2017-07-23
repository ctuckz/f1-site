import { ILocation } from "../location/location";

export interface ICircuit {
    circuitId: string,
    circuitName: string,
    Location: ILocation
}