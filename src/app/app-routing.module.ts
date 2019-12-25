import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { Error404Component } from './components/error404/error404.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
