# F1Schedule

F1 statistics and data visualizations for every season.

## API Keys

This project relies on hidden API keys. In order to have access to full functionality, a Keys class must be created and the project rebuilt.

* Add `keys.ts` to `src/app/util`.
* The contents of `keys.ts` should be:
``` typescript
export class Keys {
    static mapsAPIKey: string = "[GoogleMapsApiKey]";
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Ergast API Server

The base URL of the API can be set by changing the baseUrl property in `src/app/util/server.ts`.
To use the official Ergast API, set the base url to `https://ergast.com`. If you wish to host the
API locally, set the base url to your local API's address (default is `http://localhost:8000`).
The base url must not have a trailing slash.

More information on building and hosting your own version of the Ergast API can be found here: 
https://github.com/jcnewell/ergast-f1-api