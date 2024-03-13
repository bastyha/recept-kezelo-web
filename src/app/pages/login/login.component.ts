import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authServ:AuthService){}
  email = new FormControl('');
  password = new FormControl(''); 

  async login(){
    this.authServ.login(this.email.value as string, this.password.value as string).then(cred=>{
      console.log(cred);
    }).catch(error=>console.error(error));
  }
}
