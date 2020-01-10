import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawerService } from '../../services/drawer.service';
import { UsersService } from 'src/app/services/users.service';
import { decodeToken } from 'src/app/helpers/token';
import { User } from '../../interfaces/user.interfaces';
import { toUpper } from 'lodash';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;
  private drawerOpenedSubscription: Subscription;
  private opened: boolean;

  public nickname: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private drawerService: DrawerService, private userService: UsersService, @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit() {
    this.isLogged();
    this.drawerOpenedSubscription = this.drawerService.whenDrawerChanges()
      .subscribe(opened => this.opened = opened);
    this.userService.getInfos({ uuid: decodeToken().uuid }).subscribe((res: User) => {
      return this.nickname = toUpper(res.nickname);
    }, error => {
      return error;
    });
  }
  public onClickMenu(e: Event): void {
    e.preventDefault();

    if (this.opened) {
      this.drawerService.close();
    } else {
      this.drawerService.open();
    }
  }

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
  }

  goToProfil() {
    return this.router.navigate(['/', 'profil']);
  }
  goToHome() {
    return this.router.navigate(['/', 'bucket']);
  }

  disconnect() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    return this.router.navigate(['/', 'login']);
  }

}
