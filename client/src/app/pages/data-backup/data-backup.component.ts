import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-data-backup',
  templateUrl: './data-backup.component.html',
  styleUrls: ['./data-backup.component.scss']
})
export class DataBackupComponent implements OnInit {

  isLoading = false;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  downloadData(){
    this.isLoading = true;
    this.accountService.downloadData().subscribe(
      resData => {
        console.log(resData);
        const blob = new Blob([JSON.stringify(resData)], { type: 'application/json' });
        const url= window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Backup.json';
        link.click();
        this.isLoading = false;

      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}

