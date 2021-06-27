import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from './shared/utils';

@Injectable({
  providedIn: 'root'
})
export class TokenValidatorGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (sessionStorage.getItem('fake') === 'false') {
      const token = sessionStorage.getItem('token') as string;
      if (!Utils.validateToken(token.split(''))) {
        this.router.navigateByUrl('./login');
        alert('Token expires, Please provide new token');
        return false;
      }
      return true;
    } else {
      this.router.navigateByUrl('./login');
      return false;
    }
  }

}
