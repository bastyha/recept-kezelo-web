import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnRecipesRoutingModule } from './own-recipes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { OwnRecipesComponent } from './own-recipes.component';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {  MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PipeShareModule } from '../../shared/pipe-share/pipe-share.module';


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
    PipeShareModule
  ],

})
export class OwnRecipesModule { }
