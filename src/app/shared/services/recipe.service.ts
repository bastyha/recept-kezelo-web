import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Recipe } from '../models/Recipe';

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
}
