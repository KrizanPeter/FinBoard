import { ResourceDto } from "../resourceModels/resourceDto";
import { SnapshotDto } from "../snapshotModels/snapshotDto";

export interface DataForDaschboardChartsDto{
    resourcesDto: ResourceDto[];
    snapshotsDto: SnapshotDto[];
}