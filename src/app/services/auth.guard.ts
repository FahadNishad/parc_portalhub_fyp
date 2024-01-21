import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSevices } from './auth.service';


@Injectable({
  providedIn: 'root', //the guard is available throughout the application
})
export class authGuard implements CanActivate {
  
  constructor(private auhtServices:AuthSevices,  private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    const isLoggedIn = this.auhtServices.isLogedin();
    
    if (isLoggedIn) {
          
      const canAccessRoute = this.auhtServices.canAccessRoute(route.routeConfig?.path || '');

      console.log("router retrict method ",canAccessRoute)
      if (canAccessRoute) {
        return true;

      
      } else {
        
        // alert('You do not have permission to access this page.');
        return this.router.createUrlTree(['/unauthorized']);
      }
    } 
    
    else {
      alert('You must be logged in to access this page.');
      return this.router.createUrlTree(['/login']);
    }
  }
 
}