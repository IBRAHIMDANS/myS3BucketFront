import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateBucketComponent } from '../../components/create-bucket/create-bucket.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
  }
  public openCreateBucket(e: Event) {
    e.preventDefault();
    this.dialog.open(CreateBucketComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Create a bucket',
      }
    });
  }

}
