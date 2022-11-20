import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSummaryDataComponent } from './dashboard-summary-data.component';

describe('DashboardSummaryDataComponent', () => {
  let component: DashboardSummaryDataComponent;
  let fixture: ComponentFixture<DashboardSummaryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSummaryDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSummaryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
