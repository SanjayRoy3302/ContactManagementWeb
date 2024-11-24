import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule } from '@angular/common';
import { routes, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactHomeComponent } from './Component/contact-home/contact-home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AddContactComponent } from './Component/add-contact/add-contact.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { EditContactComponent } from './Component/edit-contact/edit-contact.component';
import { NgxPaginationModule } from 'ngx-pagination';
  

@NgModule({
  declarations: [
    AppComponent,
    ContactHomeComponent,
    AddContactComponent,
    EditContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
