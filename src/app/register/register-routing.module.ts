import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { extract } from '@app/core';
import { FinishRegisterComponent } from './finish-register/finish-register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent, data: { title: extract('register') } },
  { path: 'finish', component: FinishRegisterComponent, data: { title: extract('finish') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
