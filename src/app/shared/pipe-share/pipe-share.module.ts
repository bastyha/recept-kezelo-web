import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinuteToHoursPipe } from '../pipes/minute-to-hours.pipe';



@NgModule({
  declarations: [
    MinuteToHoursPipe,
    
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MinuteToHoursPipe,
  ]
})
export class PipeShareModule { }
