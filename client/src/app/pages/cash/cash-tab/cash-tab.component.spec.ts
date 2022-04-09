import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTabComponent } from './cash-tab.component';

describe('CashTabComponent', () => {
  let component: CashTabComponent;
  let fixture: ComponentFixture<CashTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
