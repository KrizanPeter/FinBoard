import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { LayoutService } from 'src/app/nbutils/layout.service';

@Component({
  selector: 'ngx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  
  constructor(
     private sidebarService: NbSidebarService,
     private layoutService : LayoutService
    ) { }

  changeTheme(themeName: string) {
  }

  toggleSidebar(): boolean {
     this.sidebarService.toggle(true, 'menu-sidebar');
     this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {

  }



  ngOnInit(): void {
  }

}
