import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BucketsRoutingModule } from './buckets-routing.module';
import { BucketsComponent } from '../../components/buckets/buckets.component';


@NgModule({
  declarations: [BucketsComponent],
  imports: [
    CommonModule,
    BucketsRoutingModule
  ]
})
export class BucketsModule {
}
