import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnRecipesComponent } from './own-recipes.component';

const routes: Routes = [
  {
    path:'',
    component:OwnRecipesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnRecipesRoutingModule { }
