import { Component, OnInit, Input } from '@angular/core';
import { IDriver } from "./driver";
import { DriversService } from "./drivers.service";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { Http, Response, RequestOptionsArgs, RequestOptions, Headers } from "@angular/http";
import { PagedServiceSubscription } from "../util/PagedServiceSubscription";
import { DriverService } from "./driver.service";
import { log } from "util";
import "rxjs/add/operator/do";
import { IStanding } from "../standings/standing";
import { DriverStandingsService } from "./driver-standings.service";
import { ICache, TimedCache } from "../util/timed-cache";

@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

    driver: IDriver;
    imageUrl: string;
    driverStandings: IStanding[];
    errorText: string;

    private static readonly _cache: TimedCache<IStanding[]> = new TimedCache<IStanding[]>();

    constructor(private _http: Http,
        private _activatedRoute: ActivatedRoute,
        private _router: Router) {
        _router.events.subscribe((e: NavigationStart) => {
            this.driver = null;
            this.imageUrl = null;
            this.driverStandings = null;
        });
    }

    ngOnInit() {
        this._activatedRoute.paramMap
            .map(params => params.get("driver"))
            .subscribe(driverId => {
                let driverService: DriverService = new DriverService(this._http, driverId);
                let driverServiceSubscription: PagedServiceSubscription<IDriver[]> = new PagedServiceSubscription<IDriver[]>(driverService,
                    (drivers: IDriver[]) => {
                        if (!this.driver && drivers[0]) {
                            this.driver = drivers[0];
                            this.getImageUrl(this.driver);
                            this.getDriverStandings(this.driver);
                        }
                    },
                    (error: any) => this.errorText = error);

                driverServiceSubscription.loadPage(0);
            });
    }

    private getImageUrl(driver: IDriver): void {
        //http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=India
        let wikiPageTitle: string = driver.url.substring(driver.url.lastIndexOf("/") + 1);
        if (!wikiPageTitle) {
            log("Could not find driver photo. Wiki Url: " + driver.url);
            return;
        }

        try {
            let searchUrl: string
                = decodeURI("https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageimages&format=json&piprop=original&titles=" + wikiPageTitle);

            this._http.get(searchUrl)
                .map((response: Response) => {
                    let pages: any = response.json().query.pages;
                    let page: any = pages[Object.keys(pages)[0]]
                    return <string>page.original.source
                })
                .subscribe((url: string) => this.imageUrl = url, (error: any) => this.errorText = "=> " + error.toString() + "\n\n");
        }
        catch (error) {
            this.errorText.concat("=> " + error.toString() + "\n\n");
        }
    }

    private getDriverStandings(driver: IDriver): void {
        let driverStandingsService: DriverStandingsService = new DriverStandingsService(this._http, DriverComponent._cache, driver);

        let subscription = driverStandingsService.getDriverStandings()
            .subscribe((standings: IStanding[]) =>
                this.driverStandings = standings,
            error => this.errorText = error.toString()
            );

        // Cancel loading if we naigate away
        this._router.events.subscribe((e: NavigationStart) => subscription.unsubscribe());
    }
}
