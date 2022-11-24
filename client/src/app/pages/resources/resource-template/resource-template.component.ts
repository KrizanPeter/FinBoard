import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resource-template',
  templateUrl: './resource-template.component.html',
  styleUrls: ['./resource-template.component.scss']
})
export class ResourceTemplateComponent implements OnInit {
  @Output() resourceExist = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  checkIfResourceExist(isExisting: boolean) {
    console.log("template resolver");

    this.resourceExist.emit(isExisting);
  }
}
