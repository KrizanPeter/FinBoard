import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './nbutils/pages-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;
  menu: any;
  constructor(private http: HttpClient) {
    this.menu = MENU_ITEMS;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    // this.http.get('https://localhost:5055/api/AppUser').subscribe(response => {
    //   this.users = response;
    // }, error => {
    //   console.log(error);
    // });
  }
}
