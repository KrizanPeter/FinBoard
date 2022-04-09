import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTemplateComponent } from './cash-template.component';

describe('CashTemplateComponent', () => {
  let component: CashTemplateComponent;
  let fixture: ComponentFixture<CashTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
