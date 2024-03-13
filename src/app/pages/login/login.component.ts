import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private authServ: AuthService) { }
  email = new FormControl('');
  password = new FormControl('');
  loading = false;
  async login() {
    this.loading = true;

    this.authServ.login(this.email.value as string, this.password.value as string).then(cred => {
      //console.log(cred);
      this.router.navigateByUrl('/register');
      
    }).catch(error => {
      console.error(error)
      this.loading=false;
    });
  }
}
