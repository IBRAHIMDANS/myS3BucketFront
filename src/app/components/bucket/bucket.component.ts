import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BucketService } from '../../services/bucket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddBlobComponent } from '../add-blob/add-blob.component';
import { ManageBucketComponent } from '../manage-bucket/manage-bucket.component';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {

  constructor(private bucketService: BucketService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  public addBlob(e: Event) {
    e.preventDefault();
    this.dialog.open(AddBlobComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Add',
      }
    }).afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  public createBucket(e: Event) {
    e.preventDefault();
    this.dialog.open(ManageBucketComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Create',
      }
    }).afterClosed().subscribe(res => {
      console.log(res);
    });
  }
}
