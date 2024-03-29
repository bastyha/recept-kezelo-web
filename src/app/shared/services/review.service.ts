import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Review } from '../models/Review';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  collectionName = "Reviews";
  constructor(private afs:AngularFirestore) { }
  
  create(review:Review){
    review.id = this.afs.createId();
    return this.afs.collection<Review>(this.collectionName).doc(review.id).set(review);
  }

  getForRecipe(recipe:Recipe){  
    return this.afs.collection<Review>(this.collectionName, ref=>ref.where('recipe', "==", recipe.id)).valueChanges();
  }
}
