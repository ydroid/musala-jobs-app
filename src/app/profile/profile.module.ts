import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadImageComponent } from './upload-image-profile/upload-image-profile.component';
import { AvatarModule } from 'ngx-avatar';
import { NgxUploaderModule } from 'ngx-uploader';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { WorkedProjectsComponent } from './worked-projects/worked-projects.component';
import { TasksDialogComponent } from './worked-projects/tasks-dialog/tasks-dialog.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UploadImageComponent,
    MyProjectsComponent,
    WorkedProjectsComponent,
    TasksDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AvatarModule,
    NgxUploaderModule,
    ProfileRoutingModule
  ],
  entryComponents: [TasksDialogComponent]
})
export class ProfileModule {}
