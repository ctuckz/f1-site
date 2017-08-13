import { Pipe, PipeTransform } from '@angular/core';
import { IDriver } from "./driver";

@Pipe({
    name: 'driverAlphaSort'
})
export class DriverAlphaSortPipe implements PipeTransform {

    transform(value: IDriver[], args?: any): any {
        return value.sort((a: IDriver, b: IDriver) => this.getSortName(a).localeCompare(this.getSortName(b)));
    }

    private getSortName(driver: IDriver): string {
        return driver.familyName + " " + driver.givenName;
    }

}
