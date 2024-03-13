import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'recept-kezelo';
  loggedInUser?: firebase.default.User |null;

  constructor(private authServ:AuthService){}

  closeSidenav(ev: any,sidenav: MatSidenav) {
    if(ev ===true){
      sidenav.close();
    }
  }

  onToggleSideNav(sidenav: MatSidenav) {
    sidenav.toggle()
  }

  ngOnInit(): void {
    this.authServ.isUserLoggedIn().subscribe(
      {
        next: (user => {
          this.loggedInUser = user;
        
        }),
        error: (err => {
          console.error(err);

        }),
      }
    )
  }
}
