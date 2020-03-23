import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { AllProjectsComponent } from './all-projects/all-projects.component';

@NgModule({
  declarations: [AdminPanelComponent, UsersComponent, AllProjectsComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule, SharedModule, AdminPanelRoutingModule]
})
export class AdminPanelModule {}
