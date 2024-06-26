import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });
  constructor(private router: Router,
              private authServ: AuthService,
              private userServ:UserService) { }
  loading=false;
  onSubmit() {
    this.loading=true;
    
    if (this.registerForm.valid && this.registerForm.get("password")?.value==this.registerForm.get("rePassword")?.value) {
      this.authServ.register(this.registerForm.get('email')?.value as string, this.registerForm.get('password')?.value as string).then(cred => {

        const user: User = {
          id: cred.user?.uid as string,
          email: (this.registerForm.get('email')?.value as string),
          name: {
            firstname: (this.registerForm.get('name.firstname')?.value as string),
            lastname: (this.registerForm.get('name.lastname')?.value as string)
          }
        }

        this.userServ.create(user).then(_=>
          this.router.navigateByUrl("/main")
          ).catch(error =>{
            console.error(error);
            this.loading=false;
          });
        }).catch(error => {
          this.loading=false;
          if(error.code=="auth/email-already-in-use"){
            alert("Ilyen emaillel már valaki regisztrált");
          }else{

            console.error(error);
          }
        });
      }else if(this.registerForm.get("password")?.value!=this.registerForm.get("rePassword")?.value){
        alert("Jelszavak nem egyeznek");
        this.loading=false;
      }
      else{
        alert("Nincs minden szükséges mező kitöltve");
        this.loading=false;
      }
  }
}
