import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { decodeToken } from '../helpers/token';
import * as moment from 'moment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('token')) {
        this.router.navigate(['login']);
        return false;
      }
      if (moment().unix() < decodeToken(localStorage.getItem('token')).exp) {
        return true;
      } else {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
        return false;
      }
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
