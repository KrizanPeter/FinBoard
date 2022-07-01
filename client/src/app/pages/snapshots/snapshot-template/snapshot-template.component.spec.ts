import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotTemplateComponent } from './snapshot-template.component';

describe('SnapshotTemplateComponent', () => {
  let component: SnapshotTemplateComponent;
  let fixture: ComponentFixture<SnapshotTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
