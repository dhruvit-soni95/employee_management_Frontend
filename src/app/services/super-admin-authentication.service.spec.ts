import { TestBed } from '@angular/core/testing';

import { SuperAdminAuthenticationService } from './super-admin-authentication.service';

describe('SuperAdminAuthenticationService', () => {
  let service: SuperAdminAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAdminAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
