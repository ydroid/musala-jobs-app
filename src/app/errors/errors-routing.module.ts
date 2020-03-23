import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorsComponent } from './errors.component';

const routes: Routes = [
  {
    path: '401',
    component: ErrorsComponent,
    data: { title: 'Upsss ...' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
