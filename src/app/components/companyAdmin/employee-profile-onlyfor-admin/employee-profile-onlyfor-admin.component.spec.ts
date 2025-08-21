import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileOnlyforAdminComponent } from './employee-profile-onlyfor-admin.component';

describe('EmployeeProfileOnlyforAdminComponent', () => {
  let component: EmployeeProfileOnlyforAdminComponent;
  let fixture: ComponentFixture<EmployeeProfileOnlyforAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfileOnlyforAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileOnlyforAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
