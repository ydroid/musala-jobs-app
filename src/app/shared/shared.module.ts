import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { DialogComponent } from './dialog/dialog.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { BarComponent } from './bar/bar.component';
import { RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, ReactiveFormsModule, CommonModule, RouterModule],
  declarations: [
    LoaderComponent,
    DialogComponent,
    PaginatorComponent,
    UserDialogComponent,
    BarComponent,
    ProjectDialogComponent,
    ProjectListComponent
  ],
  exports: [LoaderComponent, PaginatorComponent, BarComponent, ProjectListComponent],
  entryComponents: [DialogComponent, UserDialogComponent, ProjectDialogComponent]
})
export class SharedModule {}
