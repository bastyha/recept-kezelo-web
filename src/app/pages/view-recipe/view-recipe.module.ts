import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRecipeRoutingModule } from './view-recipe-routing.module';
import { ViewRecipeComponent } from './view-recipe.component';
import { PipeShareModule } from '../../shared/pipe-share/pipe-share.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { StepDisplayComponent } from '../../shared/step-display/step-display.component';
import {  MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ViewRecipeComponent,

  ],
  imports: [
    CommonModule,
    ViewRecipeRoutingModule,
    PipeShareModule,
    ReviewsComponent,
    StepDisplayComponent,
    MatIconModule
  ]
})
export class ViewRecipeModule { }
