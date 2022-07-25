export interface ResourceDto{
    name: string;
    currency: number;
    resourceId: string;
    accountId: string;
    amount: number;
}

export class SelectItem{
    id: string;
    name: string;
    constructor(id: string, name:string){
      this.id = id;
      this.name = name;
    }
  }