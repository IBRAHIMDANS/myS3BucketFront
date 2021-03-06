import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { Error404Component } from './components/error404/error404.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfilComponent } from './components/profil/profil.component';
import { BucketsModule } from './modules/buckets/buckets.module';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    // canActivate: [AdminGuard],
  },
  {
    path: 'profil',
    canActivate: [AdminGuard],
    component: ProfilComponent
  },
  {
    path: 'bucket',
    canActivate: [AdminGuard],
    loadChildren: () => BucketsModule,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bucket'
  },
  {
    path: '**',
    component: Error404Component
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { useHash: true }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
