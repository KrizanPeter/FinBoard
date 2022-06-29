import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { MENU_ITEMS, USER_MENU_ITEMS } from './nbutils/pages-menu';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  users: any;
  menu: any;
  private userSub : Subscription;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.menu = USER_MENU_ITEMS;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();
    this.authService.autologin();
    this.userSub = this.authService.user.subscribe(user=>{
      if(!!user)
      {
        console.log("USER MENUCKO");
        this.menu = USER_MENU_ITEMS;
      }
      else{
        console.log("Strankove MENUCKO");
        this.menu = MENU_ITEMS;
      }
      //this.userName = user.nickName;
    });
  }

  private getUsers() {
    // this.http.get('https://localhost:5055/api/AppUser').subscribe(response => {
    //   this.users = response;
    // }, error => {
    //   console.log(error);
    // });
  }
}
