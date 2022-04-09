import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMovesTabComponent } from './account-moves-tab.component';

describe('AccountMovesTabComponent', () => {
  let component: AccountMovesTabComponent;
  let fixture: ComponentFixture<AccountMovesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMovesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMovesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
