import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BucketsRoutingModule } from './buckets-routing.module';
import { BucketsComponent } from '../../components/buckets/buckets.component';
import { HomeComponent } from '../../pages/home/home.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatPaginatorModule, MatProgressBarModule,
  MatSortModule,
  MatTableModule, MatTreeModule
} from '@angular/material';
import { CreateBucketComponent } from '../../components/create-bucket/create-bucket.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng';


@NgModule({
  declarations: [
    BucketsComponent,
    CreateBucketComponent
  ],
  exports: [
    BucketsComponent
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
    MatProgressBarModule
  ],
  entryComponents: [
    CreateBucketComponent
  ]
})
export class BucketsModule {
}
