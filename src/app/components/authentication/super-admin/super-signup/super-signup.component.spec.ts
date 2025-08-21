import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSignupComponent } from './super-signup.component';

describe('SuperSignupComponent', () => {
  let component: SuperSignupComponent;
  let fixture: ComponentFixture<SuperSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
