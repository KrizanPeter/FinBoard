import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashMovesTemplateComponent } from './cash-moves-template.component';

describe('CashMovesTemplateComponent', () => {
  let component: CashMovesTemplateComponent;
  let fixture: ComponentFixture<CashMovesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashMovesTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashMovesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
