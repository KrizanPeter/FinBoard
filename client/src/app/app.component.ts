import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { takeWhile } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { MENU_ITEMS, USER_MENU_ITEMS } from './nbutils/pages-menu';
import { StateService } from './nbutils/state.service';
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
  sidebar: any = {};
  private alive = true;

  private userSub: Subscription;
  constructor(private http: HttpClient, private authService: AuthService, protected sidebarService: NbSidebarService, protected stateService: StateService, protected menuService: NbMenuService ) {
    this.menu = USER_MENU_ITEMS;
    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

      this.menuService.onItemSelect()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.sidebarService.compact('menu-sidebar'));
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getUsers();
    this.authService.autologin();
    this.userSub = this.authService.user.subscribe(user => {
      if (!!user) {
        console.log("USER MENUCKO");
        this.menu = USER_MENU_ITEMS;
      }
      else {
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
