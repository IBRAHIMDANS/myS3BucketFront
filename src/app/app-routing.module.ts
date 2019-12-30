import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { Error404Component } from './components/error404/error404.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
