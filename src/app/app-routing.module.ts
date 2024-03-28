import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, loggedInGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate:[loggedInGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate:[loggedInGuard]
  },
  {
    path:'new-recipe',
    loadChildren: () => import('./pages/new-recipe/new-recipe.module').then(m=>m.NewRecipeModule),
    canActivate:[authGuard]
  },
  {
    path:'own-recipes',
    loadChildren: () => import('./pages/own-recipes/own-recipes.module').then(m=>m.OwnRecipesModule),
    canActivate:[authGuard] 
  },
  {
    path:'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path:'view-recipe',
    loadChildren: () => import('./pages/view-recipe/view-recipe.module').then(m => m.ViewRecipeModule)
  },
  {
    path:'**', 
    redirectTo:'/main',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
