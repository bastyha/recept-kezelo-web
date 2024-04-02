import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../../shared/models/Recipe';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from '../../shared/services/recipe.service';
import { PictureService } from '../../shared/services/picture.service';
import { Picture } from '../../shared/models/Picture';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { MinuteToHoursPipe } from '../../shared/pipes/minute-to-hours.pipe';
@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css',

})
export class NewRecipeComponent implements OnInit {
  baseRecipe?: Recipe;
  selectedFile?: File;
  loading = false;
  loggedinGuy: firebase.default.User = JSON.parse(localStorage.getItem('user') as string);
  
  recipeForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200), Validators.pattern(/(\S)+/)]],
    timeInMinutes: ['', [Validators.required]],
    ingredients: this.fb.array(this.baseRecipe?(this.baseRecipe.ingredients as [{ nameOfIngredient: string; amount: number; unit: string; }]):[], [Validators.required]),
    steps: this.fb.array([], [Validators.required]),
    picture: ['']
  });
  constructor(private fb: FormBuilder,
    private recipeServ: RecipeService,
    private pictureServ: PictureService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  get ingerdients() {
    return this.recipeForm.controls["ingredients"] as FormArray;
  }
  get steps() {
    return this.recipeForm.controls['steps'] as FormArray;
  }
  addIngredient(ingredient:any=null) {
    const l_ingredientForm = this.fb.group({
      nameOfIngredient: [ingredient?ingredient.nameOfIngredient:'', [Validators.required, Validators.minLength(1), Validators.maxLength(200), Validators.pattern(/(\S)+/)]],
      amount: [ingredient?ingredient.amount:0, [Validators.required, Validators.min(0), Validators.max(9999)]],
      unit: [ingredient? ingredient.unit:'', [Validators.required, Validators.pattern(/(\S)+/), Validators.min(0), Validators.max(20)]]
    });
    this.ingerdients.push(l_ingredientForm);
  }
  deleteIngredient(ingInd: number) {
    this.ingerdients.removeAt(ingInd);
  }
  addStep(step:any=null) {
    const stepForm = this.fb.group({
      stepDescription: [step? step.stepDescription:'', [Validators.required, Validators.maxLength(200)]]
    })
    this.steps.push(stepForm);
  }
  deleteStep(stepNum: number) {
    this.steps.removeAt(stepNum);
  }
  convertTime(value: string): number {
    const inputString = value.split(':');
    return (+inputString[0]) * 60 + (+inputString[1]);
  }
  onFileSelected(event: any) {
    if (event?.target.files.length > 1) {
      alert('Choose 1 picture only');
    }
    this.selectedFile = event?.target.files[0];
  }
  async onSubmit() {
    
    this.loading = true;
    if (this.recipeForm.valid) {
      const recipe: Recipe = {
        id: '',
        image_id: '',
        name: this.recipeForm.get('name')?.value as string,
        owner: this.loggedinGuy.uid,
        timeInMinutes: this.convertTime((this.recipeForm.get('timeInMinutes')?.value as string)),
        ingredients: this.recipeForm.get('ingredients')?.value as [{ nameOfIngredient: string; amount: number; unit: string; }],
        steps: this.recipeForm.get('steps')?.value as [{ stepDescription: string }]
      }

      let picture: Picture |null = null;
      if (this.selectedFile) {
        if(this.baseRecipe){
          picture= (await firstValueFrom(this.pictureServ.getPicture(this.baseRecipe.image_id)))[0];
        }else if(!this.baseRecipe){
          picture={
            id:"",
            extension:"",
            uploader:this.loggedinGuy.uid
          }
          await this.pictureServ.create(picture, this.selectedFile);
          recipe.image_id = picture.id;
        }
      }

      if(this.baseRecipe){
        recipe.id=this.baseRecipe.id;
        recipe.image_id=this.baseRecipe.image_id;
        this.recipeServ.update(recipe,picture, this.selectedFile)
          .then(_=>this.router.navigateByUrl('/own-recipes'))
          .catch(err=>{console.error(err);this.loading=false})
          .finally(() => this.loading=false)
      }else{
        
        
          this.recipeServ.create(recipe).then(_ => {
          this.router.navigateByUrl('/main');
        }).catch(err => {
          console.error(err);
          this.loading = false;
        });
        this.loading = false;
      }
    }
  }
  ngOnInit(): void {
    let wasSet = false;
    this.actRoute.params.subscribe({
      next: result => {

        this.recipeServ.get(result["baseId"]).subscribe({
          next:val=>{
       
            if(!val[0]){
              this.router.navigateByUrl("/new-recipe");
            }else if(result["baseId"]&& val[0].owner!=this.loggedinGuy.uid){
              this.router.navigateByUrl('/main');
            }else if(result["baseId"]){
              this.baseRecipe=val[0];
              this.recipeForm.get('name')?.setValue(this.baseRecipe?.name);
              const minute =new MinuteToHoursPipe();
              this.recipeForm.get('timeInMinutes')?.setValue(minute.transform1(this.baseRecipe.timeInMinutes));
              if(!wasSet){
                wasSet=true;
                for(let ingredient of this.baseRecipe.ingredients??[]){
                  this.addIngredient(ingredient);
                }
                for(let step of this.baseRecipe.steps??[]){
                  this.addStep(step);
                }
              }
            }
          },
          error:err=>console.error(err),
      });
      },
      error:err =>console.error(err)
    });
  }
}
