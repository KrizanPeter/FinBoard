import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTemplateComponent } from './pages/account/account-template/account-template.component';
import { AccountMovesTemplateComponent } from './pages/accountMoves/account-moves-template/account-moves-template.component';

const routes: Routes = [
  { path:'', component: AccountTemplateComponent},
  { path:'account', component: AccountTemplateComponent},
  { path:'account/moves', component: AccountMovesTemplateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
