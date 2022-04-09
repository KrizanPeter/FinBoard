import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoMoveFormComponent } from './crypto-move-form.component';

describe('CryptoMoveFormComponent', () => {
  let component: CryptoMoveFormComponent;
  let fixture: ComponentFixture<CryptoMoveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoMoveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoMoveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
