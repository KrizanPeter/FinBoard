import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementTabComponent } from './retirement-tab.component';

describe('RetirementTabComponent', () => {
  let component: RetirementTabComponent;
  let fixture: ComponentFixture<RetirementTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
