import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BucketService } from '../../services/bucket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddBlobComponent } from '../add-blob/add-blob.component';

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

  createBlob(e: Event) {
    e.preventDefault();
    this.dialog.open(AddBlobComponent, {
      autoFocus: true,
      data: {
        title: 'Upload',
      }
    }).afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}
