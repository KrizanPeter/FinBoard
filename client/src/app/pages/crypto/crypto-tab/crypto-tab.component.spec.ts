import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoTabComponent } from './crypto-tab.component';

describe('CryptoTabComponent', () => {
  let component: CryptoTabComponent;
  let fixture: ComponentFixture<CryptoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
