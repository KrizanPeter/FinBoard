import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementMovesTemplateComponent } from './retirement-moves-template.component';

describe('RetirementMovesTemplateComponent', () => {
  let component: RetirementMovesTemplateComponent;
  let fixture: ComponentFixture<RetirementMovesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementMovesTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementMovesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
