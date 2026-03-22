import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnalyticsTileDto, GrowthPeriodDto } from 'src/app/_models/analytics/analyticsTileDto';

@Component({
  selector: 'app-analytics-card',
  templateUrl: './analytics-card.component.html',
  styleUrls: ['./analytics-card.component.scss']
})
export class AnalyticsCardComponent {
  @Input() tile: AnalyticsTileDto;
  @Input() selectedPeriod: string = 'quarterly';
  @Input() cardIndex: number = 0;
  @Input() cardTotal: number = 0;
  @Output() moveLeftEvent = new EventEmitter<number>();
  @Output() moveRightEvent = new EventEmitter<number>();

  get periods(): GrowthPeriodDto[] {
    return this.selectedPeriod === 'quarterly'
      ? this.tile.quarterlyGrowth
      : this.tile.yearlyGrowth;
  }

  growthText(g: number | null): string {
    if (g === null || g === undefined) return '—';
    const abs = Math.abs(g);
    const direction = g > 0 ? '▲' : g < 0 ? '▼' : '';
    const pct = `${direction} ${abs.toFixed(1)}%`;
    if (abs >= 50) return `${pct} · Strong ${g > 0 ? 'surge' : 'decline'}`;
    if (abs >= 20) return `${pct} · Significant ${g > 0 ? 'growth' : 'drop'}`;
    if (abs >= 5) return `${pct} · Moderate ${g > 0 ? 'increase' : 'decrease'}`;
    if (abs > 0) return `${pct} · Slight ${g > 0 ? 'uptick' : 'dip'}`;
    return 'No change';
  }

  growthClass(g: number | null): string {
    if (g === null || g === undefined) return 'neutral';
    if (g > 0) return 'positive';
    if (g < 0) return 'negative';
    return 'neutral';
  }
}
