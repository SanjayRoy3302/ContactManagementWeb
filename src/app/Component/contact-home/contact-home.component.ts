import { Component, inject, OnInit,ViewChild } from '@angular/core';
import { ContactDetails } from '../../Models/contact-details';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { CommonService } from '../../Service/common.service';
import { PagingConfig } from '../../Models/paging-config';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-contact-home',
  standalone: false,
  templateUrl: './contact-home.component.html',
  styleUrl: './contact-home.component.css'
})
export class ContactHomeComponent implements OnInit, PagingConfig{
  contactDetails!: Array<ContactDetails>;
  ContactDetailsForUpdate! : ContactDetails;
  contactServices!:ContactRespositoryService;
  data1!: ContactDetails;
  FullnameObj!: string;
  searchTerm!: string;
  contactList!: ContactDetails[];
  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  tableSize: number[] = [5, 10, 15, 20];
  //customers = new Array<Customer>();

  pagingConfig: PagingConfig = {} as PagingConfig;

  constructor(private contactService: ContactRespositoryService,  private matDialog: MatDialog,private commonService: CommonService) {
    this.contactServices = inject (ContactRespositoryService);
    this.contactServices = contactService;

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
}

  ngOnInit()
  {
    this.getContacts();
  }
  receivedData: string = '';

  handleData(data: string) {
    this.receivedData = data;
  }


  getContacts() {
    this.contactServices.getContactDetails().subscribe((res)=>{
      this.contactDetails = res;
      this.contactList  = res;
      this.pagingConfig.totalItems = res.length;
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

    onTableDataChange(event:any){
      this.pagingConfig.currentPage  = event;
      this.getContacts();
    }
    onTableSizeChange(event:any): void {
      this.pagingConfig.itemsPerPage = event.target.value;
      this.pagingConfig.currentPage = 1;
      this.getContacts();
    }
}