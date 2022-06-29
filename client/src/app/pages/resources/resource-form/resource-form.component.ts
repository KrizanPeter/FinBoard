import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {

  isLoading = false;
  constructor(private resourceService: ResourceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    console.log(form);
    this.resourceService.createResource(form.value.inputResourceName, 1).subscribe(
      resData => {
        this.isLoading = false;
        this.resourceService.reloadTrigger.next(true);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
    form.reset();
  }
}
