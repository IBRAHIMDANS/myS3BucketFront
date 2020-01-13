import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BucketService } from '../../services/bucket.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bucket } from '../../interfaces/bucket.interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ManageBucketComponent } from '../manage-bucket/manage-bucket.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddBlobComponent } from '../add-blob/add-blob.component';


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
  displayedColumns: string[] = ['type', 'name', 'size', 'manage'];
  dataSource: MatTableDataSource<Bucket>;
  public data: [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public optimistic;
  public urlParam;

  constructor(private bucketService: BucketService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    this.data = [];
    this.urlParam = this.router.routerState.snapshot.url.split('/').pop().toString();
  }

  public formatBytes(bytes, decimals = 2) {
    bytes = Number(bytes);
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
      if (res !== null) {
        this.optimistic = res;
        this.dataSource.data.push({ name: this.optimistic, id: null });
        this.dataSource.paginator = this.paginator;
        this.refresh();
      }
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

  openBucket(row) {
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
    if (this.urlParam === 'bucket') {
      this.bucketService.getAllBucket().subscribe(res => {
        let resTemp = [];
        res.map(b => {
          if (b.name === b.user.uuid) {
            // console.log(b.blobs);
            resTemp = res.filter(i => i.id !== b.id);
            b.blobs.map(i => resTemp.push(i));
          }
        });
        this.data = res;
        this.dataSource = new MatTableDataSource<Bucket>(resTemp);
        console.log(resTemp);
      }, error => {
        return error.message;
      }, () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.bucketService.getBucketById({ id: this.urlParam }).subscribe(res => {
        let resTemp = [];
        res.map(b => {
          if (b.name === b.user.uuid) {
            // console.log(b.blobs);
            resTemp = res.filter(i => i.id !== b.id);
            b.blobs.map(i => resTemp.push(i));
          }
        });
        this.data = res;
        this.dataSource = new MatTableDataSource<Bucket>(resTemp);
        console.log(resTemp);
      }, error => {
        return error.message;
      }, () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  isFile(row): boolean {
    return !!row.size;
  }
}
