import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BlobService } from '../../services/blob.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-blob',
  templateUrl: './add-blob.component.html',
  styleUrls: ['./add-blob.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddBlobComponent implements OnInit, OnDestroy {
  public uploadedFiles: any[] = [];
  public urlParam;

  constructor(public dialogRef: MatDialogRef<AddBlobComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private blobService: BlobService,
              private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    console.log(this.data.path);
    this.urlParam = this.router.routerState.snapshot.url.split('/').pop().toString();
  }

  ngOnDestroy() {
    this.data = [];
    this.urlParam = '';
  }

  onUpload(event) {
    this.urlParam = this.router.routerState.snapshot.url.split('/').pop().toString();
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    const formData = new FormData();
    formData.append('file', this.uploadedFiles[0]);
    if (this.urlParam === 'bucket') {
      return this.blobService.addBlob(formData).subscribe(res => {
        return res;
      }, error => {
        console.log(error);
        return error;
      }, () => {
        this.dialogRef.close(this.uploadedFiles);
      });
    } else {
      return this.blobService.addBlob(formData, this.data.path).subscribe(res => {
        return res;
      }, error => {
        console.log(error);
        return error;
      }, () => {
        this.dialogRef.close(this.uploadedFiles);
      });
    }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  public onClose(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(null);
  }
}
