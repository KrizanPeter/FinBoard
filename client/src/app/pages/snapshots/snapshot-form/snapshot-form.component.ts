import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { SnapshotService } from 'src/app/services/snapshot/snapshot.service';
import { ResourceDto } from 'src/app/_models/resourceModels/resourceDto';

@Component({
  selector: 'app-snapshot-form',
  templateUrl: './snapshot-form.component.html',
  styleUrls: ['./snapshot-form.component.scss']
})
export class SnapshotFormComponent implements OnInit {
  isLoading = false;
  resourceOptions: ResourceDto[];
  selectedOption:string;
  constructor(private resourceService: ResourceService, private snapshotService: SnapshotService) { }

  ngOnInit(): void {
    this.loadResources();
  }

  onSubmit(form: NgForm) {
    console.log(form.value.inputResourceId);
    this.isLoading = true;
    this.selectedOption = form.value.inputResourceId;
    this.snapshotService.createSnapsthot(form.value.inputResourceId, form.value.inputDateOfSnapshot, form.value.inputAmount).subscribe(
      resData => {
        this.isLoading = false;
        this.snapshotService.reloadTrigger.next(this.selectedOption);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  loadResources() {
    this.isLoading = true;
    this.resourceService.getResources().subscribe(
      resData => {
        console.log(resData);
        this.resourceOptions = resData;
        this.selectedOption = resData[0].resourceId;
        this.snapshotService.reloadTrigger.next(this.selectedOption);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  onSelectChange(form :NgForm){
    console.log(form.value.inputResourceId);
    this.snapshotService.reloadTrigger.next(form.value.inputResourceId);
  }

}
