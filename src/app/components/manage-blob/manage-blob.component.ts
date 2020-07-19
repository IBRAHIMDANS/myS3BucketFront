import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { BlobService } from 'src/app/services/blob.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-blob',
  templateUrl: './manage-blob.component.html',
  styleUrls: ['./manage-blob.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageBlobComponent implements OnInit {
  public error: undefined;
  public name = new FormControl('', [Validators.required]);
  public title: string;
  public content: string;
  public reader;

  constructor(private sanitizer: DomSanitizer, private blobService: BlobService,
              public dialogRef: MatDialogRef<ManageBlobComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.manageBlob();
  }

  public manageBlob() {
    if (this.data.title === 'Delete') {
      this.title = 'Delete Blob';
      this.content = 'Are you sure you want to delete this bucket ?';
    } else if (this.data.title === 'Information') {
      this.title = 'Information Blob';
      this.content = '';
      this.blobService.getBlob(this.data.infos.id).subscribe(res => {
        console.log(this.reader);
        this.reader = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));
        return res;
      }, error1 => {
        console.log(error1);
        return error1;
      }, () => {

      });
    } else if (this.data.title === 'Download') {
      this.title = 'Download a Blob';
      this.blobService.getBlob(this.data.infos.id).subscribe(res => {
        this.reader = res;
        return res;
      }, error1 => {
        console.log(error1);
        return error1;
      }, () => {

      });
      this.content = 'Are you sure you want to download this bucket ?';
    } else {
      this.title = 'Duplicate a Blob';
      this.content = 'Are you sure you want to duplicate this bucket ?';

    }
  }

  public onClose(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(null);
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    if (this.data.title === 'Duplicate') {
      this.blobService.duplicateBlob(this.data.infos.id).subscribe(res => {
        console.log(res);
        this.dialogRef.close(res);
        return res;
      }, error => {
        console.log(error);
        return error;
      }, () => {
      });
    } else if (this.data.title === 'Delete') {
      this.blobService.deleteBlob(this.data.infos.id).subscribe(res => {
        console.log(res);
        this.dialogRef.close(res);
        return res;
      }, error => {
        console.log(error);
        return error;
      }, () => {
      });
    } else if (this.data.title === 'Download') {
      saveAs(this.reader, this.data.infos.name);
      return;
    }
  }

}
