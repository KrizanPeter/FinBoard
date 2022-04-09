import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementMovesFormComponent } from './retirement-moves-form.component';

describe('RetirementMovesFormComponent', () => {
  let component: RetirementMovesFormComponent;
  let fixture: ComponentFixture<RetirementMovesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementMovesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementMovesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
