import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
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

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      if(!!user)
      {
      this.isAuthenticated  = true;
      }
      else{
        this.isAuthenticated = false;
      }
      this.userName = user.userName;
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

  logout(){
    this.authService.logout();
    localStorage.clear()
    this.router.navigate(["/login"])
  }
}
