import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlobRoutingModule } from './blob-routing.module';
import { AddBlobComponent } from '../../components/add-blob/add-blob.component';
import { FileUploadModule, TreeModule } from 'primeng';
import { MatButtonModule, MatIconModule, MatCardTitle, MatDialogModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTreeModule, MatProgressBarModule, MatTooltipModule } from '@angular/material';
import { ManageBlobComponent } from '../../components/manage-blob/manage-blob.component';
import { BucketsRoutingModule } from '../buckets/buckets-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddBlobComponent, ManageBlobComponent],
  imports: [
    CommonModule,
    BucketsRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TreeModule,
    MatTreeModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  entryComponents: [AddBlobComponent, ManageBlobComponent],
  exports: [AddBlobComponent, ManageBlobComponent]
})
export class BlobModule {
}
