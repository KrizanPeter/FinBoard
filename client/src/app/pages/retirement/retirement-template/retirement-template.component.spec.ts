import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementTemplateComponent } from './retirement-template.component';

describe('RetirementTemplateComponent', () => {
  let component: RetirementTemplateComponent;
  let fixture: ComponentFixture<RetirementTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
