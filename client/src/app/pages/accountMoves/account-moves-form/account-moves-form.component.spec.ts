import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMovesFormComponent } from './account-moves-form.component';

describe('AccountMovesFormComponent', () => {
  let component: AccountMovesFormComponent;
  let fixture: ComponentFixture<AccountMovesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMovesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMovesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
