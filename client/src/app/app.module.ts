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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DARK_THEME } from './styles/theme.dark';

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
  NbTabsetModule,
  NbDatepicker,
  NbDatepickerModule,
} from '@nebular/theme';
import { HeaderInterceptor } from './Interceptors/header.interceptor';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading/loading-spinner/loading-spinner.component';
import { ErrorInterceptor } from './Interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SnapshotTemplateComponent } from './pages/snapshots/snapshot-template/snapshot-template.component';
import { SnapshotFormComponent } from './pages/snapshots/snapshot-form/snapshot-form.component';
import { SnapshotListComponent } from './pages/snapshots/snapshot-list/snapshot-list.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsPieComponent } from './components/charts/pie-chart/echarts-pie.component';
import { EchartsLineComponent } from './components/charts/line-chart/echarts-line.component';
import { DashboardTemplateComponent } from './pages/_dashboard/dashboard-template/dashboard-template.component';
import { SnapshotAgregateComponent } from './pages/snapshot-agregate/snapshot-agregate/snapshot-agregate.component';


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
    SnapshotTemplateComponent,
    SnapshotFormComponent,
    SnapshotListComponent,
    EchartsPieComponent,
    EchartsLineComponent,
    DashboardTemplateComponent,
    SnapshotAgregateComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')}),
    NbDatepickerModule.forRoot(),
    NbTabsetModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, 
    NbThemeModule.forRoot(
      {
        name: 'dark',
      },
      [ DARK_THEME ],
    ),
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
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    })
  ],
  providers: [
    LayoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
