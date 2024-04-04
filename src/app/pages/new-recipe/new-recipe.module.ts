import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRecipeRoutingModule } from './new-recipe-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewRecipeComponent } from './new-recipe.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StepDisplayComponent } from '../../shared/step-display/step-display.component';

@NgModule({
  declarations: [
    NewRecipeComponent
  ],
  imports: [
    CommonModule,
    NewRecipeRoutingModule,
    ReactiveFormsModule, 
    FormsModule, 
    MatButtonModule,
    MatInputModule, 
    MatFormFieldModule,
    MatCardModule,
    MatIconModule, 
    MatProgressSpinnerModule,
    StepDisplayComponent
  ]
})
export class NewRecipeModule { }
