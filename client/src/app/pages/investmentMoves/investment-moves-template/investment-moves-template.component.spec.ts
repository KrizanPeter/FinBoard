import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentMovesTemplateComponent } from './investment-moves-template.component';

describe('InvestmentMovesTemplateComponent', () => {
  let component: InvestmentMovesTemplateComponent;
  let fixture: ComponentFixture<InvestmentMovesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentMovesTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentMovesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
