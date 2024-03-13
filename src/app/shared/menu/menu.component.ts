import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent  {
  @Input() isSideNav: boolean = false;
  @Input() loggedInUserInput?:firebase.default.User |null;
  @Output() onCloseSideNav: EventEmitter<boolean> = new EventEmitter();

  constructor(private authServ: AuthService, private router: Router) { }

  close() {
    if (this.isSideNav) {
      this.onCloseSideNav.emit(true);
    }
  }
  logout() {
    this.authServ.logout().then(_ => {
      this.router.navigateByUrl('/login');
    }).catch(error => console.error(error));

  }
}
