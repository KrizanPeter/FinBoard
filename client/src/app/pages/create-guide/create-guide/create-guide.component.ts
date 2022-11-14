import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-guide',
  templateUrl: './create-guide.component.html',
  styleUrls: ['./create-guide.component.scss']
})
export class CreateGuideComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToDashboardPage(){
    this.router.navigateByUrl("/dashboard");
  }
}
