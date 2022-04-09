import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashMovesTabComponent } from './cash-moves-tab.component';

describe('CashMovesTabComponent', () => {
  let component: CashMovesTabComponent;
  let fixture: ComponentFixture<CashMovesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashMovesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashMovesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
