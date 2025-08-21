import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyadminHeaderComponent } from './companyadmin-header.component';

describe('CompanyadminHeaderComponent', () => {
  let component: CompanyadminHeaderComponent;
  let fixture: ComponentFixture<CompanyadminHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyadminHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyadminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
