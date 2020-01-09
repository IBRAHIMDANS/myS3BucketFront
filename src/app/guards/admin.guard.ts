import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { decodeToken } from '../helpers/token';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('expire date', decodeToken(localStorage.getItem('token')).exp);
    // console.log('timestamp', moment().unix());
    if (!localStorage.getItem('token')) {
     // window.location.assign('/login');
      this.router.navigate(['login']);
      return false;
    }
    if (moment().unix() < decodeToken(localStorage.getItem('token')).exp) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
      // window.location.assign('/login');
      return false;
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
