import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-data-backup',
  templateUrl: './data-backup.component.html',
  styleUrls: ['./data-backup.component.scss']
})
export class DataBackupComponent implements OnInit {

  isLoading = false;
  isImportLoading = false;
  importJson = '';
  importError = '';
  importSuccess = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  recoverData() {
    this.importError = '';
    this.importSuccess = '';

    let parsed: any;
    try {
      parsed = JSON.parse(this.importJson);
    } catch (e) {
      this.importError = 'Invalid JSON format. Please check your input.';
      return;
    }

    this.isImportLoading = true;
    this.accountService.uploadData(parsed).subscribe(
      () => {
        this.isImportLoading = false;
        this.importSuccess = 'Data recovered successfully!';
        this.importJson = '';
      },
      error => {
        this.isImportLoading = false;
        this.importError = 'Recovery failed. Please try again.';
        console.log(error);
      }
    );
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

