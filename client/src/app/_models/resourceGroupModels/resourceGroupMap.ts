


export class ResourceGroupMapDto{
    resourceId: string;
    name: string;
    isInGroup:boolean;
}

export class GroupResourcesDto{
    resourceGroupId : string;
    resources: ResourceGroupMapDto[] = [];
}