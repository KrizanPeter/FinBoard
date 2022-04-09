import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentMovesFormComponent } from './investment-moves-form.component';

describe('InvestmentMovesFormComponent', () => {
  let component: InvestmentMovesFormComponent;
  let fixture: ComponentFixture<InvestmentMovesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentMovesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentMovesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
