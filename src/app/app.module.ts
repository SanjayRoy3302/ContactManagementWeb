import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactHomeComponent } from './Component/contact-home/contact-home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
  

@NgModule({
  declarations: [
    AppComponent,
    ContactHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
