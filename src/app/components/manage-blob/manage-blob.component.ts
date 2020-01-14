import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { BlobService } from 'src/app/services/blob.service';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeToken } from '../../helpers/token';

@Component({
  selector: 'app-manage-blob',
  templateUrl: './manage-blob.component.html',
  styleUrls: ['./manage-blob.component.scss']
})
export class ManageBlobComponent implements OnInit {
  public error: undefined;
  public name = new FormControl('', [Validators.required]);
  public title: string;
  private hidden: boolean;
  public urlParam;

  constructor(private blobService: BlobService,
              public dialogRef: MatDialogRef<ManageBlobComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private route: ActivatedRoute,
              private router: Router) {
    this.urlParam = this.router.routerState.snapshot.url.split('/').pop().toString();

  }

  ngOnInit() {
    if (this.data.title === 'Delete') {
      this.title = 'Delete Blob';
    }
  }

  public onClose(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(null);
  }

  // public submit(e: Event) {
  //   e.preventDefault();
  //   if (this.data.title === 'Delete') {
  //     return this.blobService.deleteBlob({
  //       id: this.data.infos.id,
  //     }).subscribe(res => {
  //       this.dialogRef.close(this.name.value);
  //       return res;
  //     }, error => {
  //       return error;
  //     });
  //   } else {
  //     this.blobService.duplicateBlob({
  //       id: this.data.infos.id,
  //       name: this.name.value,
  //     }).subscribe(res => {
  //       this.dialogRef.close(this.name.value);
  //       return res;
  //     }, error => {
  //       return error;
  //     });
  //   }

  // }

}
