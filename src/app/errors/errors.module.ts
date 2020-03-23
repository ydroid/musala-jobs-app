import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsComponent } from './errors.component';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ErrorsComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, SharedModule, ErrorsRoutingModule]
})
export class ErrorsModule {}
