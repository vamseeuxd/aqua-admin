import { TestBed } from '@angular/core/testing';

import { BusyIndicatorService } from './busy-indicator.service';

describe('BusyIndicatorService', () => {
  let service: BusyIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusyIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
