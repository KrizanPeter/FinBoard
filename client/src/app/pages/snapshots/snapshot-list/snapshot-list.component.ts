import { Component, OnInit } from '@angular/core';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { SnapshotService } from 'src/app/services/snapshot/snapshot.service';
import { SnapshotDto } from 'src/app/_models/snapshotModels/snapshotDto';

@Component({
  selector: 'app-snapshot-list',
  templateUrl: './snapshot-list.component.html',
  styleUrls: ['./snapshot-list.component.scss']
})
export class SnapshotListComponent implements OnInit {
  isLoading = false;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  private snapshotListSub : Subscription;
  snapshotList: SnapshotDto[];
  constructor(private snapshotService: SnapshotService) { }

  ngOnInit(): void {
    this.subscribeTableData();
  }

  ngOnDestroy(): void {
    this.snapshotListSub.unsubscribe();
  }

  subscribeTableData(){
    this.snapshotListSub = this.snapshotService.reloadTrigger.subscribe(
      resourceId=>{
        this.loadTableData(resourceId);
      }
    )
  }

  loadTableData(resourceId:string){
    this.isLoading = true;
    this.snapshotService.getSnapshots(resourceId).subscribe(
      resData => {
        console.log(resData);
        this.snapshotList = resData;
        this.isLoading = false;
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  deleteClick(snapshotId: string){
    console.log(snapshotId);
    this.snapshotService.deleteSnapshot(snapshotId).subscribe(
      resData => {
        this.snapshotListSub.unsubscribe();
        this.subscribeTableData();
      }, 
      error => {
        console.log(error);
      }
    )
  }

}
