import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactHomeComponent } from './Component/contact-home/contact-home.component';
import { AddContactComponent } from './Component/add-contact/add-contact.component';

export const routes: Routes = [
  {path:"home", component: ContactHomeComponent},
  {path:"", component: ContactHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
