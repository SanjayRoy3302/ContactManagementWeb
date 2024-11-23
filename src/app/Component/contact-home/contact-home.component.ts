import { Component, inject, OnInit,ViewChild } from '@angular/core';
import { ContactDetails } from '../../Models/contact-details';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { CommonService } from '../../Service/common.service';

@Component({
  selector: 'app-contact-home',
  standalone: false,
  templateUrl: './contact-home.component.html',
  styleUrl: './contact-home.component.css'
})
export class ContactHomeComponent implements OnInit{
  contactDetails!: Array<ContactDetails>;
  ContactDetailsForUpdate! : ContactDetails;
  contactServices!:ContactRespositoryService;
  data1!: ContactDetails;
  FullnameObj!: string;
  searchTerm!: string;
  contactList!: ContactDetails[];

  constructor(private contactService: ContactRespositoryService,  private matDialog: MatDialog,private commonService: CommonService) {
    this.contactServices = inject (ContactRespositoryService);
    this.contactServices = contactService;
}

  ngOnInit()
  {
    this.getContacts();
  }
  receivedData: string = '';

  handleData(data: string) {
    debugger;
    this.receivedData = data;
  }


  getContacts() {
    this.contactServices.getContactDetails().subscribe((res)=>{
      this.contactDetails = res;
      this.contactList  = res;
    })
  }

  openModal() {
    this.matDialog.open(AddContactComponent, {
      "width": '6000px',
      "maxHeight": '90vh',
      disableClose:true,
      "autoFocus": false
    });
  }

  OpenModalForupdate(ContactDetails: ContactDetails) {
    this.matDialog.open(EditContactComponent, {
      "width": '6000px',
      "maxHeight": '90vh',
      "data": ContactDetails,
      "autoFocus": false,
      disableClose:true
    });
  }

  EditContact(ContactDetails: ContactDetails) {
    this.OpenModalForupdate(ContactDetails);
    }

    DeleteContact(id: number) {
      debugger;
      const isConfirm = confirm("Are you sure you want to delete this contact ?");
      if(isConfirm==true)
      {
        this.contactServices.deleteContact(id).subscribe((res)=>{
          alert("Contact deleted successfully!");
          this.commonService.ReloadCurrentRoute();
        })
      }
      else
      {
        return;
      }
      
    }
    
    search(): void {
      this.contactList =new Array<ContactDetails>;
      var searchNameList = this.contactDetails.filter(x => x.firstname?.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.contactList = searchNameList;
    }
}