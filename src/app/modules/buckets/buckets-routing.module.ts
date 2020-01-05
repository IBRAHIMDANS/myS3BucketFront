import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BucketsComponent } from '../../components/buckets/buckets.component';


const routes: Routes = [
  { path: '', component: BucketsComponent },
  { path: ':id', component: BucketsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BucketsRoutingModule { }
