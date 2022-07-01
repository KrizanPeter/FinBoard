import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotFormComponent } from './snapshot-form.component';

describe('SnapshotFormComponent', () => {
  let component: SnapshotFormComponent;
  let fixture: ComponentFixture<SnapshotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
