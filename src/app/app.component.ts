import { Component, HostListener, OnInit, SimpleChanges } from '@angular/core';
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
  width:number=0;

  constructor(private authServ:AuthService){
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event:any){
    this.width=window.innerWidth;
  }


  closeSidenav(ev: any,sidenav: MatSidenav) {
    if(ev ===true){
      sidenav.close();
    }
  }

  onToggleSideNav(sidenav: MatSidenav) {
    sidenav.toggle()
  }

  ngOnInit(): void {
    this.width=window.innerWidth;
    this.authServ.isUserLoggedIn().subscribe(
      {
        next: (user => {
          this.loggedInUser = user;
          localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        }),
        error: (err => {
          console.error(err);
          localStorage.setItem('user', JSON.stringify('null'));
        }),
      }
    )
  }
}
