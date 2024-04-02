import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/Recipe';
import { PictureService } from '../../shared/services/picture.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  recipeDisplay: Array<Recipe> =[];
  recipes:Array<Recipe>=[];
  pictures: Map<string, any>= new Map();
  recipeFilter :string ='';

  constructor(private recipeServ: RecipeService,
              private pictureServ: PictureService,
              private router:Router)
  {}

  changeDisplayed($event:any): void {
    
    this.recipeDisplay=this.recipes.filter(val=>{
      return val.name.toLowerCase().includes(this.recipeFilter.toLowerCase());
    });
  }
  
  ngOnInit(): void {
    this.recipeServ.get().subscribe({
      next: val =>{
        this.recipes=val;
        this.recipeDisplay=this.recipes;
        this.pictureServ.addPicUrlToMap(val, this.pictures);
      },
      error: err =>console.error("sajat"+err)
    })
  }
}
