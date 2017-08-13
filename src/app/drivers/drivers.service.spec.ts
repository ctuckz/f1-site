import { TestBed, inject } from '@angular/core/testing';

import { DriversServiceService } from './drivers.service';

describe('DriversServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriversServiceService]
    });
  });

  it('should be created', inject([DriversServiceService], (service: DriversServiceService) => {
    expect(service).toBeTruthy();
  }));
});
