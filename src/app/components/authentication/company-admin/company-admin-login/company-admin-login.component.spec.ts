import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminLoginComponent } from './company-admin-login.component';

describe('CompanyAdminLoginComponent', () => {
  let component: CompanyAdminLoginComponent;
  let fixture: ComponentFixture<CompanyAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
