import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthTemplateComponent } from './pages/auth/auth-template/auth-template.component';
import { ResourceGroupTemplateComponent } from './pages/resource-group/resource-group-template/resource-group-template.component';
import { ResourceTemplateComponent } from './pages/resources/resource-template/resource-template.component';
import { SnapshotAgregateComponent } from './pages/snapshot-agregate/snapshot-agregate/snapshot-agregate.component';
import { SnapshotTemplateComponent } from './pages/snapshots/snapshot-template/snapshot-template.component';
import { DashboardTemplateComponent } from './pages/_dashboard/dashboard-template/dashboard-template.component';
import { HowToUseComponent } from './publicPages/how-to-use/how-to-use.component';
import { LandingPageComponent } from './publicPages/landing-page/landing-page.component';
import { ReleaseNotesComponent } from './publicPages/release-notes/release-notes.component';


const routes: Routes = [
  { path:'', component: AuthTemplateComponent},
  { path:'login', component: AuthTemplateComponent},
  { path:'landing-page', component: LandingPageComponent},
  { path:'how-to-use', component: HowToUseComponent},
  { path:'release-notes', component: ReleaseNotesComponent},
  { path:'resource', component: ResourceTemplateComponent, canActivate: [AuthGuard]},
  { path:'snapshot', component: SnapshotTemplateComponent, canActivate: [AuthGuard]},
  { path:'dashboard', component: DashboardTemplateComponent, canActivate: [AuthGuard]},
  { path:'agregate-snapshot', component:SnapshotAgregateComponent, canActivate: [AuthGuard]},
  { path:'resource-group', component:ResourceGroupTemplateComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
