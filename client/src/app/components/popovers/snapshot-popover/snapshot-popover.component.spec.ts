import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotPopoverComponent } from './snapshot-popover.component';

describe('SnapshotPopoverComponent', () => {
  let component: SnapshotPopoverComponent;
  let fixture: ComponentFixture<SnapshotPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotPopoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
