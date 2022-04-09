import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementFormComponent } from './retirement-form.component';

describe('RetirementFormComponent', () => {
  let component: RetirementFormComponent;
  let fixture: ComponentFixture<RetirementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
