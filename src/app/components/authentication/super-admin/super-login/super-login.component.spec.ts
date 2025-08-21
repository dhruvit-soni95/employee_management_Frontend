import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperLoginComponent } from './super-login.component';

describe('SuperLoginComponent', () => {
  let component: SuperLoginComponent;
  let fixture: ComponentFixture<SuperLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
