import { Component, inject, OnInit } from '@angular/core';
import { ContactDetails } from '../../Models/contact-details';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { PagingConfig } from '../../Models/paging-config';

@Component({
  selector: 'app-contact-home',
  standalone: false,
  templateUrl: './contact-home.component.html',
  styleUrl: './contact-home.component.css'
})
export class ContactHomeComponent implements OnInit, PagingConfig{
  contactDetails!: Array<ContactDetails>;
  contactServices!:ContactRespositoryService;
  data1!: ContactDetails;
  FullnameObj!: string;
  searchTerm!: string;
  contactList!: ContactDetails[];
  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  dataForUpdate!: ContactDetails;
  tableSize: number[] = [5, 10, 15, 20];
childMessage:string="";
  pagingConfig: PagingConfig = {} as PagingConfig;
popup = false
  ModalHeading:string="";
modalDialogScreen: string="";
totalRecord:number=0;

  constructor(private contactService: ContactRespositoryService) {
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
 
  getContacts() {
    this.contactServices.getContactDetails().subscribe((res)=>{
      this.contactDetails = res;
      this.contactList  = res;
      this.pagingConfig.totalItems = res.length;
      this.totalRecord = res.length;
    })
  }

  openModal() {
    this.modalDialogScreen = "NewContact";
    this.popup=true;
  }

  EditContact(ContactDetails: ContactDetails) {
    this.modalDialogScreen = "UpdateContact";
    this.dataForUpdate = ContactDetails;
    this.popup=true;
    }

   RecieveMessage($event:string)
   {
    this.childMessage = $event;
    if(this.childMessage=="close")
      this.popup = false;
    if(this.childMessage=="successful")
    {
      this.popup = false;
      this.getContacts();
    }
    else
    {
      this.popup = false;
    }

    if(this.childMessage=="closeDelete")
      this.popup = false;
    
   } 

    DeleteContact(data: ContactDetails) {
      this.dataForUpdate = data;
      this.modalDialogScreen = "DeleteContact";
      this.popup = true;
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