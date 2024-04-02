import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Review } from '../../../shared/models/Review';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewRecipeRoutingModule } from '../../new-recipe/new-recipe-routing.module';
import { ReviewService } from '../../../shared/services/review.service';
import { Recipe } from '../../../shared/models/Recipe';
import { UserService } from '../../../shared/services/user.service';
import { Subject, firstValueFrom } from 'rxjs';
import { PipeShareModule } from '../../../shared/pipe-share/pipe-share.module';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
  standalone:true,
  imports:[
    CommonModule,
    NewRecipeRoutingModule,
    ReactiveFormsModule, 
    FormsModule, 
    MatButtonModule,
    MatInputModule, 
    MatFormFieldModule,
    MatCardModule,
    MatIconModule, 
    MatProgressSpinnerModule,
    PipeShareModule
  ]
})
export class ReviewsComponent implements OnChanges{
  reviews:Array<Review>=[];
  review = new FormControl();
  loggedInUser:firebase.default.User = JSON.parse(localStorage.getItem('user') as string);
  @Input() currentRecipe?:Recipe;
  nameForId:NameForId1={};
  constructor(private reviewServ:ReviewService,
              private userServ:UserService)
  {}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.currentRecipe){

      this.reviewServ.getForRecipe(this.currentRecipe).subscribe(
        {
          next: res=>{
            this.reviews=res;       
            for(let rev of this.reviews){
              this.namePrint(rev.reviewer);
            }
          },
          error: err => console.error(err)
          
        }
      );
    }
  }

  namePrint(id:string){
    let usr= firstValueFrom(this.userServ.getAll());
    usr.then(res=>{
      let printable = res.find(val=>val.id==id);
      this.nameForId[id]=(printable?.name.lastname +" "+printable?.name.firstname);
    })
    .catch(err=>{console.error(err)});
    
  }

  addReview() {
    if(this.review.value ===""){
      return;
    }
    const toDb:Review = {
        id:'',
        date:Math.round(new Date().getTime()),
        recipe:this.currentRecipe?.id as string,
        reviewer:this.loggedInUser.uid,
        text:this.review.value
    } ;
    this.reviewServ.create(toDb)
      .then(_=>{
        alert("Komment hozzáadva!");
        this.review.setValue('');
      })
      .catch(err=>console.error(err));
  }

}
interface NameForId1{
  [key: string]:string;
};