import { Response } from "@angular/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

export interface IMapFunction<T> {
    (response: Response, index: number): T;
}

export interface IMapCatchFunction {
    (response: Response): ErrorObservable;
}

export interface ISubscribeSetValueFunction<T extends Array<any>> {
    (value: T): void;
}

export interface ISubscribeSetErrorFunction {
    (error: any): void;
}