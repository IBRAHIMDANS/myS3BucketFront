import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketsComponent } from '../../components/buckets/buckets.component';
import { BucketComponent } from '../../components/bucket/bucket.component';


const routes: Routes = [
  { path: '', component: BucketsComponent },
  { path: ':id', component: BucketsComponent,
    children: [
      { path: '**', component: BucketsComponent, pathMatch: 'full' }
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BucketsRoutingModule {
}
