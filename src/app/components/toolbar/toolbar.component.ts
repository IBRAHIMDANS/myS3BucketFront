import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.isLogged();
  }

  someMethod() {
    this.trigger.openMenu();
    console.log(this.trigger);
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }
  disconnect() {
    localStorage.removeItem('token');
    return this.router.navigate(['/', 'login']);
  }

}
