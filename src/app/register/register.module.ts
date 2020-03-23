import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { FinishRegisterComponent } from './finish-register/finish-register.component';

@NgModule({
  declarations: [RegisterComponent, FinishRegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule, RegisterRoutingModule]
})
export class RegisterModule {}
