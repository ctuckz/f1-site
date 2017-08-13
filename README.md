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