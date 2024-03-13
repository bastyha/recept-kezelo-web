import {  inject } from '@angular/core';
import { CanActivateFn,Router, UrlTree } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const urlToFallBackOn =inject(Router).createUrlTree(['main']);
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user){
    return true;
  }
  return urlToFallBackOn;
};
export const loggedInGuard: CanActivateFn =(route, state)=>{
  const urlToFallBackOn =inject(Router).createUrlTree(['main']);
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user){
    return urlToFallBackOn;
  }
  return true;
}
