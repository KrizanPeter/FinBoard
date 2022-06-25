import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTemplateComponent } from './pages/account/account-template/account-template.component';
import { AuthTemplateComponent } from './pages/auth/auth-template/auth-template.component';
import { ResourceTemplateComponent } from './pages/resources/resource-template/resource-template.component';


const routes: Routes = [
  { path:'', component: AuthTemplateComponent},
  { path:'account', component: ResourceTemplateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
