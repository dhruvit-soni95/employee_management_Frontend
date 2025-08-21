import { TestBed } from '@angular/core/testing';

import { CompanyAdminAuthenticationService } from './company-admin-authentication.service';

describe('CompanyAdminAuthenticationService', () => {
  let service: CompanyAdminAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAdminAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
