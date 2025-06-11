import { TestBed } from '@angular/core/testing';

import { JwtInteceptorService } from './jwt-inteceptor.service';

describe('JwtInteceptorService', () => {
  let service: JwtInteceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtInteceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
