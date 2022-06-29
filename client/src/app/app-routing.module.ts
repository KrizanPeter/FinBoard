import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthTemplateComponent } from './pages/auth/auth-template/auth-template.component';
import { ResourceTemplateComponent } from './pages/resources/resource-template/resource-template.component';


const routes: Routes = [
  { path:'', component: AuthTemplateComponent},
  { path:'login', component: AuthTemplateComponent},
  { path:'resource', component: ResourceTemplateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
