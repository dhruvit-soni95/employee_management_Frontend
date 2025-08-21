import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminFooterComponent } from './superadmin-footer.component';

describe('SuperadminFooterComponent', () => {
  let component: SuperadminFooterComponent;
  let fixture: ComponentFixture<SuperadminFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
