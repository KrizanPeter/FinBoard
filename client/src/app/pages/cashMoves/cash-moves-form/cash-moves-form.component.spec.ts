import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashMovesFormComponent } from './cash-moves-form.component';

describe('CashMovesFormComponent', () => {
  let component: CashMovesFormComponent;
  let fixture: ComponentFixture<CashMovesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashMovesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashMovesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
