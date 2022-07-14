import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceGroupMapComponent } from './resource-group-map.component';

describe('ResourceGroupMapComponent', () => {
  let component: ResourceGroupMapComponent;
  let fixture: ComponentFixture<ResourceGroupMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceGroupMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceGroupMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
