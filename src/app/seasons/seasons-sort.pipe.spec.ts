import { SeasonsSortPipe } from './seasons-sort.pipe';
import { ISeason } from './season';

describe('SeasonsSortPipe', () => {
    it('create an instance', () => {
        const pipe = new SeasonsSortPipe();
        expect(pipe).toBeTruthy();
    });

    it('sorts descending', () => {
        const pipe = new SeasonsSortPipe();
        let season1: ISeason = <ISeason>{ season: "1" };
        let season2: ISeason = <ISeason>{ season: "2" };
        expect(pipe.transform(new Array<ISeason>(season1, season2)))
            .toEqual(new Array<ISeason>(season2, season1));
    });
});
