import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { PictureService } from '../../shared/services/picture.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../shared/models/Recipe';
import { Picture } from '../../shared/models/Picture';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent implements OnInit {
  recipe?:Recipe;
  owner?:User;
  pic=new Map<string, any>();
  constructor(private recipeServ:RecipeService,
              private pictureServ:PictureService, 
              private actRoute:ActivatedRoute,
              private userServ:UserService){}

              
  ngOnInit(): void {
    this.actRoute.params.subscribe({
      next: val=>{
        this.recipeServ.get(val["recipeId"]).subscribe(
          {
            next: rec=>{
              this.recipe = rec[0];
              this.pictureServ.addPicUrlToMap(rec, this.pic);
              this.userServ.getAll().subscribe(
                {
                  next: usr=>{
                    this.owner= usr.find(ussr => ussr.id==this.recipe?.owner);
                  }
                }
              )
            },
            error: err=>console.error(err)
          }
        )
      },
      error:err=>console.error(err)
    })
  }
}
