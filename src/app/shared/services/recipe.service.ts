import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Recipe } from '../models/Recipe';
import { User } from '../models/User';
import { firstValueFrom } from 'rxjs';
import { PictureService } from './picture.service';
import { Picture } from '../models/Picture';
import { ReviewService } from './review.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  collectionName='Recipes';

  constructor(private afs:AngularFirestore,
              private pictureServ: PictureService,
              private reviewServ:ReviewService) { }

  create(recipe:Recipe){
    recipe.id = this.afs.createId();
    return this.afs.collection<Recipe>(this.collectionName).doc(recipe.id).set(recipe);
  }
  get(recipeID:string|null=null, name:string|null=null, owner:string|null=null, timeInMinutes:number|null=null){
    
      return this.afs.collection<Recipe>(this.collectionName, ref =>{
          let endQuery=ref.where("timeInMinutes", ">=", 0);

          if(owner)
            endQuery = endQuery.where('owner', "==", owner);
          if(name)
            endQuery = endQuery.where("name","==",name);
          if(recipeID)
            endQuery = endQuery.where("id", "==", recipeID);
          if(timeInMinutes)
            endQuery = endQuery.where("timeInMinutes", "==", timeInMinutes);
          return endQuery;
        }
          ).valueChanges();

  }
  delete(recipe:Recipe){
    if(recipe.image_id){

      firstValueFrom(this.pictureServ.getPicture(recipe.image_id)).then(
        val1=>{
          this.pictureServ.delete(val1[0]); 
        }).catch(err=>console.error(err));
        
      
    }
    this.reviewServ.delete(recipe);
    return this.afs.doc(this.collectionName+'/'+recipe.id).ref.delete();
  }
  update(recipe:Recipe, pic:Picture|null=null, filePic:File|null=null){

    if(pic&&filePic){
      if(recipe.image_id)
        this.pictureServ.update(pic, filePic);
      else
        this.pictureServ.create(pic, filePic);  
      recipe.image_id=pic.id;
    }
    return this.afs.collection<Recipe>(this.collectionName).doc(recipe.id).set(recipe);
  }

}
