import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BucketService } from '../../services/bucket.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bucket } from '../../interfaces/bucket.interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ManageBucketComponent } from '../manage-bucket/manage-bucket.component';
import { ActivatedRoute, Router } from '@angular/router';


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
    this.dialog.open(ManageBucketComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Create',
      }
    }).afterClosed().subscribe(res => {
      if (res !== null) {
        this.optimistic = res;
        this.dataSource.data.push({ name: this.optimistic, id: null });
        this.dataSource.paginator = this.paginator;
        this.refresh();
      }
    });
  }

  ngOnInit() {
    this.refresh();
  }

  editBucket(e: Event, row) {
    e.preventDefault();
    this.dialog.open(ManageBucketComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Edit',
        infos: row
      }
    }).afterClosed().subscribe(res => {
      if (res !== null) {
        this.optimistic = res;
        this.dataSource.data.push({ name: this.optimistic, id: null });
        this.dataSource.paginator = this.paginator;
        this.refresh();
      }
    });
  }

  openBucket(e: Event, row) {
    return this.router.navigate(['/', 'bucket', row.id]);
  }

  deleteBucket(e: Event, row) {
    e.preventDefault();
    this.dialog.open(ManageBucketComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Delete',
        infos: row
      }
    }).afterClosed().subscribe(res => {
      if (res !== null) {
        this.optimistic = res;
        this.dataSource.data = this.dataSource.data.filter(i => i.id !== row.id);
        this.dataSource.paginator = this.paginator;
        this.refresh();
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    this.bucketService.getAllBucket().subscribe(res => {
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
