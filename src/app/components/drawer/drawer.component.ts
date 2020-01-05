import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerService } from '../../services/drawer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit,OnDestroy  {
  public opened: Observable<boolean>;
  constructor(private drawerService: DrawerService) { }

  ngOnInit() {
    this.opened = this.drawerService.whenDrawerChanges();
  }
  public ngOnDestroy(): void {
  }
  public onClickDrawerTimes(e: MouseEvent): void {
    e.preventDefault();
    (e.currentTarget as HTMLAnchorElement).blur();
    this.drawerService.close();
  }

  public onCloseDrawer(): void {
    this.drawerService.close();
  }

  public onClickRouterLink(e: MouseEvent): void {
    (e.currentTarget as HTMLAnchorElement).blur();
    this.drawerService.close();
  }
}
