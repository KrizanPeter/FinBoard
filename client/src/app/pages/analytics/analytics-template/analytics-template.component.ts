import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnalyticsTileDto } from 'src/app/_models/analytics/analyticsTileDto';

@Component({
  selector: 'app-analytics-template',
  templateUrl: './analytics-template.component.html',
  styleUrls: ['./analytics-template.component.scss']
})
export class AnalyticsTemplateComponent implements OnInit {

  tiles: AnalyticsTileDto[] = [];
  selectedPeriod: string = 'yearly';
  isLoading: boolean = true;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadTiles();
  }

  private loadTiles() {
    this.isLoading = true;
    this.analyticsService.getTiles().subscribe(
      resData => {
        this.tiles = resData;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  onPeriodChange(period: string) {
    this.selectedPeriod = period;
  }

  moveLeft(index: number) {
    if (index <= 0) return;
    this.swap(index, index - 1);
  }

  moveRight(index: number) {
    if (index >= this.tiles.length - 1) return;
    this.swap(index, index + 1);
  }

  private swap(from: number, to: number) {
    const temp = this.tiles[from];
    this.tiles[from] = this.tiles[to];
    this.tiles[to] = temp;

    const reorderList = this.tiles.map((tile, i) => ({
      sourceId: tile.sourceId,
      sourceType: tile.entityType === 'resource' ? 0 : 1,
      orderIndex: i
    }));

    this.analyticsService.reorderTiles(reorderList).subscribe(
      () => {},
      error => {
        console.log(error);
      }
    );
  }
}
