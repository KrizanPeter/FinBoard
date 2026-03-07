import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/nbutils/layout.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'ngx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub : Subscription;
  isAuthenticated :boolean;
  userName : string;
  isDarkTheme: boolean;

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private themeService: NbThemeService,
  ) {
    this.isDarkTheme = (localStorage.getItem('theme') || 'default') === 'dark';
  }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      console.log("subscribed in header!");
      console.log(user);
      if(!!user)
      {
      this.isAuthenticated  = true;
      this.userName = user.userName;
      }
      else{
        this.isAuthenticated = false;
        this.userName= "";
      }

    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.isAuthenticated = false
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
  }

  login(){
    this.router.navigate(["/login"])
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const themeName = this.isDarkTheme ? 'dark' : 'default';
    this.themeService.changeTheme(themeName);
    localStorage.setItem('theme', themeName);
  }

  logout(){
    this.authService.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(["/login"])
  }
}
