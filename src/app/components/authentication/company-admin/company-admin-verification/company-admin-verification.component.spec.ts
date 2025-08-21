import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminVerificationComponent } from './company-admin-verification.component';

describe('CompanyAdminVerificationComponent', () => {
  let component: CompanyAdminVerificationComponent;
  let fixture: ComponentFixture<CompanyAdminVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAdminVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAdminVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
