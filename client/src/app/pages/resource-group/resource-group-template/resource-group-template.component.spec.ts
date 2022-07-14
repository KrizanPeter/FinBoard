import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceGroupTemplateComponent } from './resource-group-template.component';

describe('ResourceGroupTemplateComponent', () => {
  let component: ResourceGroupTemplateComponent;
  let fixture: ComponentFixture<ResourceGroupTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceGroupTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceGroupTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
