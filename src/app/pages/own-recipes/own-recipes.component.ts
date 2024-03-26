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

  ngOnInit(): void {
    let loggedInUser:firebase.default.User = JSON.parse(localStorage.getItem('user') as string);
    if(loggedInUser){
      this.recipeServ.get(null, null, loggedInUser.uid).subscribe(recipes=>{
        this.recipes=recipes;
        
        this.pictureServ.addPicUrlToMap(recipes, this.pictures);
        
      });
    }
  }

   deleteRecpie(recipe: Recipe) {
    if(confirm('You sure you wanna delete '+recipe.name+'?')){
      this.loading=true;
      this.recipeServ.delete(recipe).then(_=>
        this.loading=false
        ).catch(err =>{console.error(err);this.loading=false});
    }
  }
}
