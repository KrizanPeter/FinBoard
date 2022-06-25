import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutService } from './nbutils/layout.service';
import { AccountTemplateComponent } from './pages/account/account-template/account-template.component';
import { AccountTabComponent } from './pages/account/account-tab/account-tab.component';
import { AccountFormComponent } from './pages/account/account-form/account-form.component';
import { AuthTemplateComponent } from './pages/auth/auth-template/auth-template.component';
import { LoginFormComponent } from './pages/auth/login-form/login-form.component';
import { RegisterFormComponent } from './pages/auth/register-form/register-form.component';
import { ResourceFormComponent } from './pages/resources/resource-form/resource-form.component';
import { ResourceListComponent } from './pages/resources/resource-list/resource-list.component';
import { ResourceTemplateComponent } from './pages/resources/resource-template/resource-template.component';
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
import { HeaderInterceptor } from './Interceptors/header.interceptor';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccountFormComponent,
    AccountTemplateComponent,
    AccountTabComponent,
    ResourceFormComponent,
    ResourceListComponent,
    ResourceTemplateComponent,
    AuthTemplateComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, 
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
  providers: [
    LayoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
