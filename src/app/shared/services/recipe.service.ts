import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Recipe } from '../models/Recipe';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  collectionName='Recipes';

  constructor(private afs:AngularFirestore) { }

  create(recipe:Recipe){
    recipe.id = this.afs.createId();
    return this.afs.collection<Recipe>(this.collectionName).doc(recipe.id).set(recipe);
  }
  getRecipeByUserID(usrId:string){
    return this.afs.collection<Recipe>(this.collectionName, ref => ref.where('owner', '==', usrId)).valueChanges();
  }
  delete(recipe:Recipe){
    return this.afs.doc(this.collectionName+'/'+recipe.id).ref.delete();
  }
}
