import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { BucketService } from '../../services/bucket.service';

@Component({
  selector: 'app-manage-bucket',
  templateUrl: './manage-bucket.component.html',
  styleUrls: ['./manage-bucket.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageBucketComponent implements OnInit {
  public error: undefined;
  public name = new FormControl('', [Validators.required]);
  public title: string;
  private hidden: boolean;

  constructor(private bucketService: BucketService,
              public dialogRef: MatDialogRef<ManageBucketComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    if (this.data.title === 'Delete') {
      this.title = 'Delete Bucket';
    } else {
      this.title = this.data.title === 'Create' ? 'Create a Bucket ' : 'Edit a Bucket';
    }
  }

  public onClose(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(null);
  }

  public submit(e: Event) {
    e.preventDefault();
    if (this.data.title === 'Create') {
      return this.bucketService.addBucket({
        name: this.name.value,
      }).subscribe(res => {
        this.dialogRef.close(this.name.value);
        return res;
      }, error => {
        return error;
      });
    } else if (this.data.title === 'Delete') {
      return this.bucketService.deleteBucket({
        id: this.data.infos.id,
      }).subscribe(res => {
        this.dialogRef.close(this.name.value);
        return res;
      }, error => {
        return error;
      });
    } else {
      this.bucketService.editBucket({
        id: this.data.infos.id,
        name: this.name.value,
      }).subscribe(res => {
        this.dialogRef.close(this.name.value);
        return res;
      }, error => {
        return error;
      });
    }

  }

}
