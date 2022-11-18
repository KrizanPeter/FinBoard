export class SnapshotDto{
    dateOfSnapshot: Date;
    resourceId: string;
    amount: number;

    constructor(date: Date, resourceId:string, amount:number){
        this.dateOfSnapshot = date;
        this.amount = amount;
        this.resourceId = resourceId;
    }

}
