import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ResourceGroupDto } from "src/app/_models/resourceGroupModels/resourceGroupDto";
import { GroupResourcesDto } from "src/app/_models/resourceGroupModels/resourceGroupMap";
import { ResourceDto } from "src/app/_models/resourceModels/resourceDto";
import { environment } from "src/environments/environment";


@Injectable({providedIn:'root'})
export class ResourceGroupService{
    reloadTrigger = new BehaviorSubject<boolean>(true);
    reloadForResourceGroupMapperTrigger = new Subject<boolean>();
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient){
    }

    getResourceGroups(){
        return this.http.get<ResourceGroupDto[]>(this.baseUrl+'ResourceGroup/getAll');
    }

    deleteResourceGroup(resourceGroupId:string){
        return this.http.delete(this.baseUrl+'ResourceGroup/delete?resourceGroupId='+resourceGroupId);
    }

    setResourceToGroup(resourceGroupMapList: GroupResourcesDto) {
        return this.http.put<GroupResourcesDto>(this.baseUrl+'ResourceGroup/addResource', resourceGroupMapList);
      }

    getResourceForGroup(selectedOption: string) {
        return this.http.get<GroupResourcesDto>(this.baseUrl+'ResourceGroup/getGroupsResources?resourceGroupId='+selectedOption);
      }

    createResourceGroup(name: string){
        return this.http.post(this.baseUrl+'ResourceGroup/create', {
            resourceGroupName: name,
        });
    }
}