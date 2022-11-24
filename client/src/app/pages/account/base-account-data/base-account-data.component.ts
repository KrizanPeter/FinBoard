import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { AccountService } from 'src/app/services/account/account.service';
import { baseAccountDataDto } from 'src/app/_models/accountModels/baseAccountDataDto';

@Component({
  selector: 'app-base-account-data',
  templateUrl: './base-account-data.component.html',
  styleUrls: ['./base-account-data.component.scss']
})
export class BaseAccountDataComponent implements OnInit {
  isLoading = false;
  baseDataDto: baseAccountDataDto;
  dateFromDto: Date;
  min: Date;
  max: Date;
  oldPeriodicity: number;
  updateAllowed:boolean = false;
  constructor(private accountService: AccountService, protected dateService: NbDateService<Date>) {
    this.min = this.dateService.addYear(this.dateService.today(), -5);
    this.max = this.dateService.addMonth(this.dateService.today(), 1);
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.isLoading = true;
    this.accountService.getBaseData().subscribe(
      baseData => {
        console.log("base Data load");
        console.log(baseData)
        this.baseDataDto = baseData
        this.dateFromDto = new Date(baseData.dateOfFirstSnapshot);
        this.oldPeriodicity = baseData.periodicityOfSnapshotsInDays;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(form : NgForm){
    this.isLoading = true;
    if(form.value.inputPeriodicity === '') {
      form.value.inputPeriodicity = this.oldPeriodicity;
    }
    let baseData = new baseAccountDataDto(this.baseDataDto.accountId, this.dateFromDto, form.value.inputPeriodicity)
    this.accountService.setBaseData(baseData).subscribe(
      baseData => {
        console.log("base Data save");
        console.log(baseData);
        this.isLoading = false;
        this.baseDataDto = baseData; 
        this.dateFromDto = new Date(baseData.dateOfFirstSnapshot);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
    //form.reset();
  }

  validateOfChange(form : NgForm){
    let oldPeriodicity = this.baseDataDto.periodicityOfSnapshotsInDays;
    let oldDate = this.baseDataDto.dateOfFirstSnapshot;
    let newPeriodicity = form.value.inputPeriodicity
    let newDate = this.dateFromDto;

    this.updateAllowed = (new Date(oldDate).toISOString() !== newDate.toISOString() || (form.value.inputPeriodicity !=='' && form.value.inputPeriodicity != this.oldPeriodicity))

  }
}
