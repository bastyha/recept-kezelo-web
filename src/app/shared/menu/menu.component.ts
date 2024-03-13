import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Input() isSideNav:boolean =false;
  @Output() onCloseSideNav: EventEmitter<boolean> = new EventEmitter();
  close(){
    if(this.isSideNav){
      this.onCloseSideNav.emit(true);
    }
  }
}
