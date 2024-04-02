import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private authServ: AuthService) { }
  email = new FormControl('',[Validators.required]);
  password = new FormControl('', [Validators.required]);
  loading = false;
  login() {
    this.loading = true;
    if(this.email.valid&&this.password.valid){
   
      this.authServ.login(this.email.value as string, this.password.value as string)
      .then(cred => {
        //console.log(cred);
        this.router.navigateByUrl('/main');
        
      }).catch(error => {
        
        alert("Incorrect email or password!");
        this.loading=false;
      });
     
      
    }else{
      alert("Email or password not provided");
      this.loading=false;
    }
  }
}
