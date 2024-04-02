import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { FormsModule } from '@angular/forms';
import { PipeShareModule } from '../../shared/pipe-share/pipe-share.module';

@NgModule({
  declarations: [
    MainComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    PipeShareModule
  ],

})
export class MainModule { }
