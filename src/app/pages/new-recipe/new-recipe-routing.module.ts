import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipeComponent } from './new-recipe.component';

const routes: Routes = [
  {
    path:':baseId',
    component:NewRecipeComponent
  },
  {
    path:'',
    component:NewRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRecipeRoutingModule { }
