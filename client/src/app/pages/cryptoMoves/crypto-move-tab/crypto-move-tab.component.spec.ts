import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoMoveTabComponent } from './crypto-move-tab.component';

describe('CryptoMoveTabComponent', () => {
  let component: CryptoMoveTabComponent;
  let fixture: ComponentFixture<CryptoMoveTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoMoveTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoMoveTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
