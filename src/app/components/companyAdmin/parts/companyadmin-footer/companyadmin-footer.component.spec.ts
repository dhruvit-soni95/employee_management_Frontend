import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyadminFooterComponent } from './companyadmin-footer.component';

describe('CompanyadminFooterComponent', () => {
  let component: CompanyadminFooterComponent;
  let fixture: ComponentFixture<CompanyadminFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyadminFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyadminFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
