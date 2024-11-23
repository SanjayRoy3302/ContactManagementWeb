import { Component, inject, OnInit } from '@angular/core';
import { ContactDetails } from '../../Models/contact-details';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-contact-home',
  standalone: false,
  templateUrl: './contact-home.component.html',
  styleUrl: './contact-home.component.css'
})
export class ContactHomeComponent implements OnInit{
  ContactDetails!: Array<ContactDetails>;
  contactServices!:ContactRespositoryService;

  constructor(private contactService: ContactRespositoryService,  private matDialog: MatDialog) {
    this.contactServices = inject (ContactRespositoryService);
    this.contactServices = contactService;
}

  ngOnInit()
  {
    this.getContacts();
  }


  getContacts() {
    this.contactServices.getContactDetails().subscribe((res)=>{
      this.ContactDetails = res;
    })
  }

  openModal() {
    this.matDialog.open(AddContactComponent, {
      "width": '6000px',
      "maxHeight": '90vh',
      //"data": "John",
      "autoFocus": false
    });
  }
}
