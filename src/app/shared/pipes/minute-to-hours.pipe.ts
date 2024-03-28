import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteToHours', 
})
export class MinuteToHoursPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let output="";
    let hours = Math.floor(value/60);
    let mintues = value-(hours*60);
    if(hours>0){
      output+=hours+' óra és '+mintues+' perc elkésziteni' ;
    }else{
      output+=mintues+' perc elkészíteni';
    }

    return output;
  }

  transform1(value:number):string{
    let output="";
    let hours = Math.floor(value/60);
    let mintues = value-(hours*60);

    if(hours>10){
      output+=hours;
    }else {
      output+='0'+hours;
    }
    output+=':';
    if(mintues>10){
      output+=mintues;
    }else {
      output+='0'+mintues;
    }

    return output;
  }

}
