import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../../components/error404/error404.component';
import { BucketsComponent } from '../../components/buckets/buckets.component';


const routes: Routes = [
  { path: 'bucket', component: BucketsComponent },
  { path: 'bucket/:id', component: BucketsComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BucketsRoutingModule { }
