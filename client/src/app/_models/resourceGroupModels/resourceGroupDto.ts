import { ResourceDto } from "../resourceModels/resourceDto";

export interface ResourceGroupDto{
    resourceGroupId: string;
    accountId: string;
    resourceGroupName: string;
    resources: ResourceDto[];
}