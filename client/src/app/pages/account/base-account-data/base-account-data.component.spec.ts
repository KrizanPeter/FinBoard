import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAccountDataComponent } from './base-account-data.component';

describe('BaseAccountDataComponent', () => {
  let component: BaseAccountDataComponent;
  let fixture: ComponentFixture<BaseAccountDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAccountDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseAccountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
