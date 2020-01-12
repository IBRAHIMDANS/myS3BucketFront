import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlobRoutingModule } from './blob-routing.module';
import { AddBlobComponent } from '../../components/add-blob/add-blob.component';
import { FileUploadModule } from 'primeng';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ManageBlobComponent } from '../../components/manage-blob/manage-blob.component';


@NgModule({
  declarations: [AddBlobComponent, ManageBlobComponent],
  imports: [
    CommonModule,
    BlobRoutingModule,
    FileUploadModule,
    MatIconModule,
    MatButtonModule
  ],
  entryComponents: [AddBlobComponent],
  exports: [AddBlobComponent]
})
export class BlobModule {
}
