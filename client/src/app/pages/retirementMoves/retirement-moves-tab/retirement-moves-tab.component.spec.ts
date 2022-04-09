import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementMovesTabComponent } from './retirement-moves-tab.component';

describe('RetirementMovesTabComponent', () => {
  let component: RetirementMovesTabComponent;
  let fixture: ComponentFixture<RetirementMovesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementMovesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementMovesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
