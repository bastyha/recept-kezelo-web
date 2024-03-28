import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRecipeRoutingModule } from './view-recipe-routing.module';
import { ViewRecipeComponent } from './view-recipe.component';
import { PipeShareModule } from '../../shared/pipe-share/pipe-share.module';
import { CommentSectionComponent } from './comment-section/comment-section.component';


@NgModule({
  declarations: [
    ViewRecipeComponent,
    CommentSectionComponent
  ],
  imports: [
    CommonModule,
    ViewRecipeRoutingModule,
    PipeShareModule
  ]
})
export class ViewRecipeModule { }
