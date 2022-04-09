import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMovesTemplateComponent } from './account-moves-template.component';

describe('AccountMovesTemplateComponent', () => {
  let component: AccountMovesTemplateComponent;
  let fixture: ComponentFixture<AccountMovesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMovesTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMovesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
