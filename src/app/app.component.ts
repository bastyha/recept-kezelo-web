import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
closeSidenav(ev: any,sidenav: MatSidenav) {
  if(ev ===true){
    sidenav.close();
  }
}
  title = 'recept-kezelo';
  onToggleSideNav(sidenav: MatSidenav) {
    sidenav.toggle()
  }
}
