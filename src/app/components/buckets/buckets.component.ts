import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BucketService } from '../../services/bucket.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bucket } from '../../interfaces/bucket.interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreateBucketComponent } from '../create-bucket/create-bucket.component';
import { ActivatedRoute, Router } from '@angular/router';

export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false) {
  }
}

@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BucketsComponent implements OnInit {
  displayedColumns: string[] = ['type', 'name', 'size'];
  dataSource: MatTableDataSource<Bucket>;
  public data: [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public optimistic;

  constructor(private bucketService: BucketService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    this.data = [];
  }

  public openCreateBucket(e: Event) {
    e.preventDefault();
    this.dialog.open(CreateBucketComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Create a bucket',
      }
    }).afterClosed().subscribe(res => {
      this.optimistic = res;
      this.dataSource.data.push({ name: this.optimistic, id: null });
      this.dataSource.paginator = this.paginator;
      this.refresh();
    });
  }

  ngOnInit() {
    this.refresh();
  }

  editBucket(row) {
    console.log(row);
  }

  openBucket(row) {
    console.log(row);
  }

  deleteBucket(row) {
    console.log(row);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    this.bucketService.getAllBucket().subscribe(res => {
      console.log(res);
      this.data = res;
      this.dataSource = new MatTableDataSource<Bucket>(res);
    }, error => {
      return error.message;
    }, () => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
