import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotAgregateComponent } from './snapshot-agregate.component';

describe('SnapshotAgregateComponent', () => {
  let component: SnapshotAgregateComponent;
  let fixture: ComponentFixture<SnapshotAgregateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotAgregateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotAgregateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
