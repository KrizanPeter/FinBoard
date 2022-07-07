import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { SnapshotService } from 'src/app/services/snapshot/snapshot.service';
import { ResourceDto } from 'src/app/_models/resourceModels/resourceDto';
import { SnapshotDto } from 'src/app/_models/snapshotModels/snapshotDto';

@Component({
  selector: 'app-snapshot-agregate',
  templateUrl: './snapshot-agregate.component.html',
  styleUrls: ['./snapshot-agregate.component.scss']
})
export class SnapshotAgregateComponent implements OnInit {

  resoucesList: ResourceDto[];
  inputAgregateSnapshot: SnapshotDto[] = [];
  isLoading = false;
  
  constructor(private resourceService: ResourceService, private router: Router, private snapshotService: SnapshotService) { }

  ngOnInit(): void {
    this.inputAgregateSnapshot = [];
      this.loadResources();
    }

  loadResources(){
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
  
  prepareInputArray(){
    this.resoucesList.forEach(element => {
      this.inputAgregateSnapshot.push(new SnapshotDto(null, element.resourceId, null))
    });
  }

  onSubmit(form: NgForm){
    const date = form.value.inputDateOfSnapshot;
    for(let i = 0; i<this.inputAgregateSnapshot.length; i++){
      this.inputAgregateSnapshot[i].dateOfChange = date;
    }

    this.isLoading = true;

    this.snapshotService.createAggregateSnapsthot(this.inputAgregateSnapshot).subscribe(
      resData => {
        this.isLoading = false;
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
    form.reset();
    this.ngOnInit();
  }

}
