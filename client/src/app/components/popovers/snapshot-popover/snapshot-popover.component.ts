import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snapshot-popover',
  templateUrl: './snapshot-popover.component.html',
  styleUrls: ['./snapshot-popover.component.scss']
})
export class SnapshotPopoverComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("initialized popover")
  }

}
