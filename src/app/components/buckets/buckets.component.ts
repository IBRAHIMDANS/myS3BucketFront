import { Component, OnInit, ViewChild } from '@angular/core';
import { BucketService } from '../../services/bucket.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bucket } from '../../interfaces/bucket.interfaces';

export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false) {}
}
@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent implements OnInit {
  displayedColumns: string[] = ['type', 'name', 'size'];
  dataSource: MatTableDataSource<Bucket>;
  public data: [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private bucketService: BucketService) {
    this.data = [];
  }

  ngOnInit() {
    this.bucketService.getAllBucket().subscribe(res => {
      console.log(res);
      this.data = res;
      this.dataSource = new MatTableDataSource<Bucket>(res);
    }, error => {
      console.log(error);
    }, () => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
