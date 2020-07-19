import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  public location;

  public constructor(private locationService: Location) {
    this.location = locationService;
  }

  public ngOnInit(): void {
    setTimeout(() => this.goBack(), 2000);
  }

  public goBack(): void {
    this.location.back();
  }

}
