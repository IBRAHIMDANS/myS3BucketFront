import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { BlobService } from 'src/app/services/blob.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private blobService: BlobService,
              public dialogRef: MatDialogRef<ManageBlobComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    if (this.data.title === 'Delete') {
      this.title = 'Delete Blob';
    } else if (this.data.title === 'Information') {
      this.title = 'Information Blob';
      console.log(this.data.infos.id);
      this.blobService.getBlob(this.data.infos.id).subscribe(res => {
        console.log(res);
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.title = this.data.title === 'Create' ? 'Create a Blob ' : 'Edit a Blob';
    }
  }

  public onClose(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(null);
  }

}
