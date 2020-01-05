import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;
  private drawerOpenedSubscription: Subscription;
  private opened: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private drawerService: DrawerService) {
  }

  ngOnInit() {
    this.isLogged();
    this.drawerOpenedSubscription = this.drawerService.whenDrawerChanges()
      .subscribe(opened => this.opened = opened);

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
    return !!localStorage.getItem('token');
  }

  goToProfil() {
    console.log(this.trigger);
  }

  disconnect() {
    localStorage.removeItem('token');
    return this.router.navigate(['/', 'login']);
  }

}
