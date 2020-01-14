import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlobComponent } from '../../components/add-blob/add-blob.component';
import { FileUploadModule, TreeModule } from 'primeng';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { ManageBlobComponent } from '../../components/manage-blob/manage-blob.component';
import { BucketsRoutingModule } from '../buckets/buckets-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatBytesPipe } from '../../pipes/format-bytes.pipe';


@NgModule({
  declarations: [
    AddBlobComponent,
    ManageBlobComponent,
    FormatBytesPipe
  ],
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
    FileUploadModule,
    MatListModule,
  ],
  entryComponents: [
    AddBlobComponent,
    ManageBlobComponent
  ],
  exports: [
    AddBlobComponent,
    ManageBlobComponent,
    FormatBytesPipe
  ]
})
export class BlobModule {
}
