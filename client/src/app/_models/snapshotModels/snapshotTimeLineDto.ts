export interface SnapshotTimelineElementDto
{
    date: Date;
    isSuccess: boolean;
    tooltip: string;
    resources: TimelineResourceDto[];
}

export interface TimelineResourceDto
{
    name: string;
    IsSnapped: boolean;
}