import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-blob',
  templateUrl: './add-blob.component.html',
  styleUrls: ['./add-blob.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddBlobComponent implements OnInit {
  public uploadedFiles: any[] = [];

  constructor(public dialogRef: MatDialogRef<AddBlobComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);
    this.dialogRef.close(this.uploadedFiles);
    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  public onClose(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(null);
  }
}
