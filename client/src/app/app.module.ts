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
  NbCheckboxModule,
  NbRadioModule,
  NbStepperModule,
  NbTooltipModule,
  NbPopoverModule,
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
import { ResourceGroupTemplateComponent } from './pages/resource-group/resource-group-template/resource-group-template.component';
import { ResourceGroupListComponent } from './pages/resource-group/resource-group-list/resource-group-list.component';
import { ResourceGroupFormComponent } from './pages/resource-group/resource-group-form/resource-group-form.component';
import { ResourceGroupMapComponent } from './pages/resource-group/resource-group-map/resource-group-map.component';
import { DashboardViewComponent } from './pages/_dashboard/dashboard-view/dashboard-view.component';
import { DashboardDialogComponent } from './pages/_dashboard/dashboard-dialog/dashboard-dialog.component';
import { DashboardChartComponent } from './pages/_dashboard/dashboard-chart/dashboard-chart.component';
import { LandingPageComponent } from './publicPages/landing-page/landing-page.component';
import { HowToUseComponent } from './publicPages/how-to-use/how-to-use.component';
import { ReleaseNotesComponent } from './publicPages/release-notes/release-notes.component';
import { StateService } from './nbutils/state.service';
import { OutsideClickDirective } from './directives/outsideclick.directive';
import { CreateGuideComponent } from './pages/create-guide/create-guide/create-guide.component';
import { BaseAccountDataComponent } from './pages/account/base-account-data/base-account-data.component';
import { SnapshotPopoverComponent } from './components/popovers/snapshot-popover/snapshot-popover.component';
import { DashboardSummaryDataComponent } from './pages/_dashboard/dashboard-summary-data/dashboard-summary-data.component';
import { DataBackupComponent } from './pages/data-backup/data-backup.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
    ResourceGroupTemplateComponent,
    ResourceGroupListComponent,
    ResourceGroupFormComponent,
    ResourceGroupMapComponent,
    DashboardViewComponent,
    DashboardDialogComponent,
    DashboardChartComponent,
    LandingPageComponent,
    HowToUseComponent,
    ReleaseNotesComponent,
    OutsideClickDirective,
    CreateGuideComponent,
    BaseAccountDataComponent,
    SnapshotPopoverComponent,
    DashboardSummaryDataComponent,
    DataBackupComponent,
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
    NbRadioModule,
    NbSelectModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    NbCardModule,
    NbStepperModule,
    NbTooltipModule,
    NbPopoverModule,
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
    StateService,
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
