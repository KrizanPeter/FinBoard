import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SnapshotPopoverComponent } from 'src/app/components/popovers/snapshot-popover/snapshot-popover.component';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { SnapshotService } from 'src/app/services/snapshot/snapshot.service';
import { ResourceDto } from 'src/app/_models/resourceModels/resourceDto';
import { SnapshotDto } from 'src/app/_models/snapshotModels/snapshotDto';
import { SnapshotTimelineElementDto } from 'src/app/_models/snapshotModels/snapshotTimeLineDto';

@Component({
  selector: 'app-snapshot-agregate',
  templateUrl: './snapshot-agregate.component.html',
  styleUrls: ['./snapshot-agregate.component.scss']
})
export class SnapshotAgregateComponent implements OnInit {

  resoucesList: ResourceDto[];
  inputAgregateSnapshot: SnapshotDto[] = [];
  snapshotTimeline: SnapshotTimelineElementDto[];
  loadedExistingSnapshots: SnapshotDto[] = [];
  snapshotTimelineElements = 0;
  isOveralValid: boolean;
  isLoading = false;
  isTimelineLoading = false;
  dateFromDto: Date;
  snapshotHint = SnapshotPopoverComponent;
  a = 1;

  constructor(private resourceService: ResourceService, private router: Router, private snapshotService: SnapshotService) { }

  ngOnInit(): void {
    this.inputAgregateSnapshot = [];
    this.loadResources();
    this.loadSnapshotTimeline();
  }

  loadSnapshotTimeline() {
    this.snapshotService.getSnapshotTimeline().subscribe(
      timelineData => {
        this.isTimelineLoading = false;
        this.snapshotTimeline = timelineData;
        this.snapshotTimelineElements = timelineData.length;
        this.isOveralValid = this.checkValidity();
        this.setNearestDate();
      },
      error => {
        this.isTimelineLoading = false;
        console.log(error);
      }
    );
  }

  checkValidity():boolean{
    let result = true;
    this.snapshotTimeline.forEach(element => {
      if(!element.isSuccess){
        result = false;
      }
    });
    return result;
  }

  
  setNearestDate(){
    
    this.snapshotTimeline.forEach(snapshot => {
      if(snapshot.isSuccess == false){
        this.dateFromDto = new Date(snapshot.date);
        return;
      }
    });
  }

  getSnapshotForDate(date: Date){
    console.log("hola holaa moji mili")
    this.snapshotService.getSnapshotForDate(date).subscribe(
      resData => {
        this.loadedExistingSnapshots = resData;
        console.log(resData);
        this.inputAgregateSnapshot.forEach(input => {
          this.loadedExistingSnapshots.forEach(data => {
            if(input.resourceId === data.resourceId){
              input.amount = data.amount;
            }
          });
        });

      },
      error => {
        console.log(error);
      }
    );
  }

  loadResources() {
    this.isLoading = true;
    this.resourceService.getResources().subscribe(
      resData => {
        this.isLoading = false;
        console.log(resData);
        this.resoucesList = resData;
        this.prepareInputArray();
      },
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  prepareInputArray() {
    this.resoucesList.forEach(element => {
      this.inputAgregateSnapshot.push(new SnapshotDto(null, element.resourceId, null))
    });
  }

  onSubmit(form: NgForm) {
    const date = this.dateFromDto;
    for (let i = 0; i < this.inputAgregateSnapshot.length; i++) {
      this.inputAgregateSnapshot[i].dateOfSnapshot = date;
    }

    this.isLoading = true;

    this.snapshotService.createAggregateSnapsthot(this.inputAgregateSnapshot).subscribe(
      resData => {
        this.isLoading = false;
        this.ngOnInit();
      },
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
    form.reset();
  }

  setDate(date: Date){
    console.log(date)
    this.dateFromDto = new Date(date);
    this.getSnapshotForDate(new Date(date));

  }

}
