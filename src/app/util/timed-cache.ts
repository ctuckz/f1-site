export interface ICache<T> {
    add(key: string, item: T): void;
    get(key: string): T;
}

export class TimedCache<T> implements ICache<T> {
    private items: CacheEntry<T>[] = new Array<CacheEntry<T>>(0);

    add(key: string, item: T): void {
        if (!this.items.find(i => i.key == key)) {
            this.items.push(new CacheEntry<T>(key, item));
        }
    }
    get(key: string): T {
        let cacheEntry: CacheEntry<T> = this.items.find(i => i.key == key);
        if (!cacheEntry) {
            return null;
        }

        if (cacheEntry.isValid()) {
            return cacheEntry.item;
        }
        else {
            this.items = this.items.filter(i => i.key != key);
        }
    }

}

export class CacheEntry<T> {
    private timeEntered: Date;

    constructor(public key: string, public item: T) {
        this.timeEntered = new Date(Date.now());
     }

    isValid(): boolean {
        // Items stay valid for 30 minutes
        return ((Date.now() - this.timeEntered.valueOf()) / 1000 / 60) < 30;

    }
}