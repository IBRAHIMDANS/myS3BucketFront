import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_DIALOG_DATA,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, OverlayPanelModule } from 'primeng';
// component
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { Error404Component } from './components/error404/error404.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { BucketsModule } from './modules/buckets/buckets.module';
import { DrawerComponent } from './components/drawer/drawer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AuthModule } from './modules/auth/auth.module';
import { BlobModule } from './modules/blob/blob.module';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    Error404Component,
    DrawerComponent,
    HomeComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    ButtonModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    // module custom
    BucketsModule,
    AuthModule,
    BlobModule,
  ],
  exports: [
    Error404Component,
    ToolbarComponent,
    DrawerComponent,
    HomeComponent,
    ProfilComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ResetPasswordComponent]
})
export class AppModule {
}

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
