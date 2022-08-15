import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';
import { ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardViewComponent implements OnInit {

  constructor(private dialogService: NbDialogService) { }
  names:string[];
  ngOnInit(): void {
  }

  openDashboardDialog() {
    this.dialogService.open(DashboardDialogComponent)
      .onClose.subscribe(name => name && this.names.push(name));
  }
}
