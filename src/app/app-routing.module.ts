import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
