import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnRecipesRoutingModule } from './own-recipes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { OwnRecipesComponent } from './own-recipes.component';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MinuteToHoursPipe } from '../../shared/pipes/minute-to-hours.pipe';
import {  MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    OwnRecipesComponent,
    MinuteToHoursPipe
  ],
  imports: [
    CommonModule,
    OwnRecipesRoutingModule, 
    MatCardModule, 
    MatProgressSpinnerModule,
    MatButtonModule, 
    MatIconModule
  ]
})
export class OwnRecipesModule { }
