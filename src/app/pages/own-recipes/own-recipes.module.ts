import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnRecipesRoutingModule } from './own-recipes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { OwnRecipesComponent } from './own-recipes.component';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {  MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PipeShareModule } from '../../shared/pipe-share/pipe-share.module';
import { StepDisplayComponent } from '../../shared/step-display/step-display.component';


@NgModule({
  declarations: [
    OwnRecipesComponent,

  ],
  imports: [
    CommonModule,
    OwnRecipesRoutingModule, 
    MatCardModule, 
    MatProgressSpinnerModule,
    MatButtonModule, 
    MatIconModule,
    PipeShareModule,
    StepDisplayComponent
  ],

})
export class OwnRecipesModule { }
