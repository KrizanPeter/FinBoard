import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTabComponent } from './investment-tab.component';

describe('InvestmentTabComponent', () => {
  let component: InvestmentTabComponent;
  let fixture: ComponentFixture<InvestmentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
