import { TestBed, inject } from '@angular/core/testing';

import { SeasonService } from './season.service';
import { HttpModule } from "@angular/http";

describe('SeasonService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SeasonService],
            imports: [HttpModule]
        });
    });

    it('should be created', inject([SeasonService], (service: SeasonService) => {
        expect(service).toBeTruthy();
    }));
});
