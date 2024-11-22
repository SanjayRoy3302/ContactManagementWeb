import { Component, inject, OnInit } from '@angular/core';
import { ContactDetails } from '../../Models/contact-details';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';

@Component({
  selector: 'app-contact-home',
  standalone: false,
  templateUrl: './contact-home.component.html',
  styleUrl: './contact-home.component.css'
})
export class ContactHomeComponent implements OnInit{
  ContactDetails!: Array<ContactDetails>;
  contactServices!:ContactRespositoryService;

  constructor(private contactService: ContactRespositoryService) {
    this.contactServices = inject (ContactRespositoryService);
    this.contactServices = contactService;
}

  ngOnInit()
  {
    this.getContacts();
  }


  getContacts() {
    debugger;
    this.contactServices.getContactDetails().subscribe((res)=>{
      this.ContactDetails = res;
    })
  }
}
