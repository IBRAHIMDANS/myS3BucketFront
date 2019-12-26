import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger, {static: false}) trigger: MatMenuTrigger;

  constructor() {
  }

  ngOnInit() {
    console.log(this.trigger);
  }

  someMethod() {
    this.trigger.openMenu();
    console.log(this.trigger);
  }

}
