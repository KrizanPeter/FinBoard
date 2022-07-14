import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceGroupFormComponent } from './resource-group-form.component';

describe('ResourceGroupFormComponent', () => {
  let component: ResourceGroupFormComponent;
  let fixture: ComponentFixture<ResourceGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceGroupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
