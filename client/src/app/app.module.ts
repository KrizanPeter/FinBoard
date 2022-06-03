import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './components/header/header.component';

import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule,
  NbDialogModule,
  NbCardModule,
  NbInputModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutService } from './nbutils/layout.service';
import { AccountTemplateComponent } from './pages/account/account-template/account-template.component';
import { AccountTabComponent } from './pages/account/account-tab/account-tab.component';
import { AccountMovesTemplateComponent } from './pages/accountMoves/account-moves-template/account-moves-template.component';
import { AccountMovesFormComponent } from './pages/accountMoves/account-moves-form/account-moves-form.component';
import { AccountMovesTabComponent } from './pages/accountMoves/account-moves-tab/account-moves-tab.component';
import { AccountFormComponent } from './pages/account/account-form/account-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccountFormComponent,
    AccountTemplateComponent,
    AccountTabComponent,
    AccountMovesTemplateComponent,
    AccountMovesFormComponent,
    AccountMovesTabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule.forRoot(),
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    NbCardModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  providers: [LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
