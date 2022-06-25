import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth-template',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './auth-template.component.html',
  styleUrls: ['./auth-template.component.scss']
})
export class AuthTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
