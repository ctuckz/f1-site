import { Pipe, PipeTransform } from '@angular/core';
import { ISeason } from "./season";

@Pipe({
    name: 'seasonsSort'
})
export class SeasonsSortPipe implements PipeTransform {

    transform(value: ISeason[]): ISeason[] {
        return value.sort((a, b) => -a.season.localeCompare(b.season));
    }

}
