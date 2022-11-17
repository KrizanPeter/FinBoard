import { DashboardTemplateComponent } from "src/app/pages/_dashboard/dashboard-template/dashboard-template.component";

export class baseAccountDataDto{
    accountId: string;
    dateOfFirstSnapshot: Date;    
    periodicityOfSnapshotsInDays: number;

    constructor(accountId:string, dateOfFirstSnapshot: Date, periodicityOfSnapshotsInDays: number)
    {
        this.accountId  = accountId;
        this.dateOfFirstSnapshot = dateOfFirstSnapshot;
        this.periodicityOfSnapshotsInDays = periodicityOfSnapshotsInDays;
    }
}
