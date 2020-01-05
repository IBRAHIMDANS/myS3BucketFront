import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { BucketService } from '../../services/bucket.service';

@Component({
  selector: 'app-create-bucket',
  templateUrl: './create-bucket.component.html',
  styleUrls: ['./create-bucket.component.scss']
})
export class CreateBucketComponent implements OnInit {
  public error: undefined;
  public name = new FormControl('', [Validators.required]);
  private hidden: boolean;

  constructor(private bucketService: BucketService,
              public dialogRef: MatDialogRef<CreateBucketComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  public onClose(event: Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  public submit(e: Event) {
    e.preventDefault();
    return this.bucketService.addBucket({
      name: this.name.value,
    }).subscribe(res => {
      this.dialogRef.close();
      return res;
    }, error => {
      return error;
    });
  }

}
