export class SnapshotDto{
    dateOfChange: Date;
    resourceId: string;
    amount: number;

    constructor(date: Date, resourceId:string, amount:number){
        this.dateOfChange = date;
        this.amount = amount;
        this.resourceId = resourceId;
    }

}
