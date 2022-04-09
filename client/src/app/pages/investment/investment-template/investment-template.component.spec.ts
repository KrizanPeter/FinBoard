import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTemplateComponent } from './investment-template.component';

describe('InvestmentTemplateComponent', () => {
  let component: InvestmentTemplateComponent;
  let fixture: ComponentFixture<InvestmentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
