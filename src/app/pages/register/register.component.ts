import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
    rePassword:new FormControl(''),
    name: new FormGroup({
      firstname:new FormControl(''),
      lastname: new FormControl('')
    })
  });
  onSubmit(){
    console.log("adas");
  }
}
