import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [ProjectComponent],
  imports: [CommonModule, SharedModule, FlexLayoutModule, MaterialModule, AvatarModule, ProjectRoutingModule]
})
export class ProjectModule {}
