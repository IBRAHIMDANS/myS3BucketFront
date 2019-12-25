import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { Error404Component } from './components/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ToolbarComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
