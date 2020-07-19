import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private drawerOpen$ = new BehaviorSubject(false);
  constructor() { }
  public whenDrawerChanges(): Observable<boolean> {
    return this.drawerOpen$.asObservable();
  }

  public open(): void {
    this.drawerOpen$.next(true);
  }

  public close(): void {
    this.drawerOpen$.next(false);
  }
}
