import { Component, OnInit } from '@angular/core';
import { DriversService } from "./drivers.service";
import { IDriver } from "./driver";
import { PagedServiceSubscription } from "../util/PagedServiceSubscription";
import { Http } from "@angular/http";

@Component({
    selector: 'app-drivers',
    templateUrl: './drivers.component.html',
    styleUrls: ['./drivers.component.css'],
    providers: [{
        provide: DriversService,
        useFactory: (http: Http) => new DriversService(http),
        deps: [Http]
    }]
})
export class DriversComponent implements OnInit {

    letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    driverLetters: string[] = new Array<string>(0);
    drivers: IDriver[] = new Array<IDriver>();
    error: string;

    constructor(private driversService: DriversService) { }

    ngOnInit() {
        let pagedServiceSubscription: PagedServiceSubscription<IDriver[]> = new PagedServiceSubscription(this.driversService,
            (drivers: IDriver[]) => this.mapDrivers(drivers),
            (error: any) => this.handleError(error));
        pagedServiceSubscription.loadPage(0);
    }

    private mapDrivers(drivers: IDriver[]): void {
        try {
            for (let driver of drivers) {
                if (driver && driver.familyName && driver.familyName.length > 0) {
                    let key: string = driver.familyName.charAt(0).toUpperCase();
                    if (this.driverLetters.indexOf(key) == -1) {
                        this.driverLetters.push(key);
                    }
                    this.drivers.push(driver);
                }
            }
        }
        catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any): void {
        if (!this.error) {
            this.error = "=> " + error.toString();
        }
        else {
            this.error.concat("\n\n=> " + error.toString());
        }
    }

}
