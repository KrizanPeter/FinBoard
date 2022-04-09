import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoMoveTemplateComponent } from './crypto-move-template.component';

describe('CryptoMoveTemplateComponent', () => {
  let component: CryptoMoveTemplateComponent;
  let fixture: ComponentFixture<CryptoMoveTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoMoveTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoMoveTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
