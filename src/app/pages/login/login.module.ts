import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule, 
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinner, 
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginModule { }
