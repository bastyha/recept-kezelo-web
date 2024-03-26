import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/Recipe';
import { PictureService } from '../../shared/services/picture.service';
import { MinuteToHoursPipe } from '../../shared/pipes/minute-to-hours.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  recipeDisplay: Array<Recipe> =[];
  pictures: Map<string, any>= new Map();
  constructor(private recipeServ: RecipeService,
              private pictureServ: PictureService,
              private router:Router)
  {}

  ngOnInit(): void {
    this.recipeServ.get().subscribe({
      next: val =>{
        this.recipeDisplay=val;
        
        this.pictureServ.addPicUrlToMap(val, this.pictures);
      },
      error: err =>console.error("sajat"+err)
    })
  }

  
}
