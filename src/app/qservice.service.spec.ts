import { TestBed } from '@angular/core/testing';

import { QserviceService } from './qservice.service';

describe('QserviceService', () => {
  let service: QserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
