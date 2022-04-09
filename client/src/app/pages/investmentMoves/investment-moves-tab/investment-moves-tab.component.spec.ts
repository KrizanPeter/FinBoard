import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentMovesTabComponent } from './investment-moves-tab.component';

describe('InvestmentMovesTabComponent', () => {
  let component: InvestmentMovesTabComponent;
  let fixture: ComponentFixture<InvestmentMovesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentMovesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentMovesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
