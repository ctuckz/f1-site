import { StandingsSortPipe } from './standings.pipe';

describe('StandingsPipe', () => {
    it('create an instance', () => {
        const pipe = new StandingsSortPipe();
        expect(pipe).toBeTruthy();
    });
});
