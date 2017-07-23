import { Pipe, PipeTransform } from '@angular/core';
import { IStanding } from "./standing";

@Pipe({
    name: 'standingsSort'
})
export class StandingsSortPipe implements PipeTransform {

    transform(value: IStanding[]): any {
        if (!value) return;

        return value.sort((a, b) => {
            let positionA: number = a.position || 10000;
            let positionB: number = b.position || 10000;

            return positionA - positionB;
        });
    }

}
