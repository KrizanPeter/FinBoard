import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoTemplateComponent } from './crypto-template.component';

describe('CryptoTemplateComponent', () => {
  let component: CryptoTemplateComponent;
  let fixture: ComponentFixture<CryptoTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
