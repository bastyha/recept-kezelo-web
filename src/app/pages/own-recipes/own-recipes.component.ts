import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PictureService } from '../../shared/services/picture.service';
import { Recipe } from '../../shared/models/Recipe';
import { RecipeService } from '../../shared/services/recipe.service';
import { User } from '../../shared/models/User';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-own-recipes',
  templateUrl: './own-recipes.component.html',
  styleUrl: './own-recipes.component.css'
})
export class OwnRecipesComponent implements OnInit {
  recipes:Array<Recipe> =[];
  pictures=new Map<string, any>();
  loading = false;
  constructor(private recipeServ:RecipeService, 
              private pictureServ:PictureService,
              private router:Router){

  }

  getPictureWrapper(recipe:Recipe){

    this.pictureServ.getPicture(recipe.image_id).subscribe({
      next:value=> {
        this.pictureServ.getUrl(value?value[0]:null).subscribe({
          next:url=>{

            this.pictures.set(recipe.id,url);
          },
          error:err=>{
            console.error(err);
          }
        })
      },
      error:err=> {
        console.error(err);
      },
    });
  }
  ngOnInit(): void {
    let loggedInUser:firebase.default.User = JSON.parse(localStorage.getItem('user') as string);
    if(loggedInUser){
      this.recipeServ.getRecipeByUserID(loggedInUser.uid).subscribe(recipes=>{
        this.recipes=recipes;
        for (const recipe of recipes) {
        
          this.getPictureWrapper(recipe);
          

        }
      });
    }
  }

   deleteRecpie(recipe: Recipe) {
    if(confirm('You sure you wanna delete '+recipe.name+'?')){
      this.loading=true;
      if(recipe.image_id){

        firstValueFrom(this.pictureServ.getPicture(recipe.image_id)).then(
        val1=>{

              this.recipeServ.delete(recipe);
              this.pictureServ.delete(val1[0]);
              
             
            }).catch(err=>console.error(err));
       
      }else{
        this.recipeServ.delete(recipe);
      }
      this.loading=false;
    }
  }
}
