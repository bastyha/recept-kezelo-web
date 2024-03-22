import { Component } from '@angular/core';
import { Recipe } from '../../shared/models/Recipe';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from '../../shared/services/recipe.service';
import { PictureService } from '../../shared/services/picture.service';
import { Picture } from '../../shared/models/Picture';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css',

})
export class NewRecipeComponent {


  selectedFile?: File;
  loading = false;

  recipeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), Validators.pattern(/(\S)+/)]],
    timeInMinutes: ['', [Validators.required]],
    ingredients: this.fb.array([], [Validators.required]),
    steps: this.fb.array([], [Validators.required]),
    picture: ['']
  });
  /*
  
  recipeForm= new FormGroup({
    name:new FormControl(''),
    timeInMinutes:new FormControl(0),
    steps:new FormGroup({
      stepNumber: new FormControl(''),
    stepDescription: new FormControl('')
  })
});
*/
  constructor(private fb: FormBuilder,
    private recipeServ: RecipeService,
    private pictureServ: PictureService,
    private router: Router
  ) { }

  get ingerdients() {
    return this.recipeForm.controls["ingredients"] as FormArray;
  }
  get steps() {
    return this.recipeForm.controls['steps'] as FormArray;
  }


  addIngredient() {
    const l_ingredientForm = this.fb.group({
      nameOfIngredient: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), Validators.pattern(/(\S)+/)]],
      amount: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
      unit: ['', [Validators.required, Validators.pattern(/(\S)+/), Validators.min(0), Validators.max(20)]]
    });

    this.ingerdients.push(l_ingredientForm);
  }

  deleteIngredient(ingInd: number) {
    this.ingerdients.removeAt(ingInd);
  }


  addStep() {

    const stepForm = this.fb.group({
      stepDescription: ['', [Validators.required, Validators.maxLength(200)]]
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
    if(event?.target.files.length>1){
      alert('Choose 1 picture only');
    }
    this.selectedFile = event?.target.files[0];
 
  }

  async onSubmit() {
    

    const loggedinGuy:firebase.default.User = JSON.parse(localStorage.getItem('user') as string);
    this.loading = true;
    if (this.recipeForm.valid) {
     

      const recipe: Recipe = {
        id: '',
        image_id: '',
        name: this.recipeForm.get('name')?.value as string,
        owner: loggedinGuy.uid,
        timeInMinutes: this.convertTime((this.recipeForm.get('timeInMinutes')?.value as string)),
        ingredients: this.recipeForm.get('ingredients')?.value as [{ nameOfIngredient: string; amount: number; unit: string; }],
        steps: this.recipeForm.get('steps')?.value as [{stepDescription:string}]

      }


      if (this.selectedFile) {
      
        const picture: Picture = {
          id: '',
          uploader:loggedinGuy.uid,
          extension:'',
        
         
        }

        await this.pictureServ.create(picture, this.selectedFile);

        recipe.image_id = picture.id;
      }
      
      
      this.recipeServ.create(recipe).then(_ => {

        
        this.router.navigateByUrl('/main');

      }).catch(err => {
        console.error(err);
        this.loading=false;
      });
      
     this.loading=false;
    }
  }
}
