import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resource-group-form',
  templateUrl: './resource-group-form.component.html',
  styleUrls: ['./resource-group-form.component.scss']
})
export class ResourceGroupFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    
  }

}
