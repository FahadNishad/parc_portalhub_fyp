import { TestBed } from '@angular/core/testing';

import { AuthSevicesService } from './auth.service';

describe('AuthSevicesService', () => {
  let service: AuthSevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
