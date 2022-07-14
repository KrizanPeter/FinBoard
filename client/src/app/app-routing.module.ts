import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthTemplateComponent } from './pages/auth/auth-template/auth-template.component';
import { ResourceGroupTemplateComponent } from './pages/resource-group/resource-group-template/resource-group-template.component';
import { ResourceTemplateComponent } from './pages/resources/resource-template/resource-template.component';
import { SnapshotAgregateComponent } from './pages/snapshot-agregate/snapshot-agregate/snapshot-agregate.component';
import { SnapshotTemplateComponent } from './pages/snapshots/snapshot-template/snapshot-template.component';
import { DashboardTemplateComponent } from './pages/_dashboard/dashboard-template/dashboard-template.component';


const routes: Routes = [
  { path:'', component: AuthTemplateComponent},
  { path:'login', component: AuthTemplateComponent},
  { path:'resource', component: ResourceTemplateComponent},
  { path:'snapshot', component: SnapshotTemplateComponent},
  { path:'dashboard', component: DashboardTemplateComponent},
  { path:'agregate-snapshot', component:SnapshotAgregateComponent},
  { path:'resource-group', component:ResourceGroupTemplateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
