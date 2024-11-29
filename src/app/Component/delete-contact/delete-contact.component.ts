import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../../Service/common.service';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { ContactDetails } from '../../Models/contact-details';

@Component({
  selector: 'app-delete-contact',
  standalone: false,
  
  templateUrl: './delete-contact.component.html',
  styleUrl: './delete-contact.component.css'
})
export class DeleteContactComponent implements OnInit{

  constructor(private contactService: ContactRespositoryService, private commonService: CommonService){
  }
  contactDetails!: ContactDetails;
  formValues!: ContactDetails;
  fullname!:string;
  @Output() newItemEvent = new EventEmitter<string>();
  ngOnInit(): void {
    
  }

  closeModal() {
    this.newItemEvent.emit("close");
    this.commonService.GetOutputEventIfUndefined(this.newItemEvent);
  }

  @Input('SetData')set dataForUpdate(data: any) {
    debugger;
    this.contactDetails = data;
    this.fullname = this.contactDetails.firstname+" "+this.contactDetails.lastname;
    console.log(data);
};

DeleteContact(id: number) {
  this.contactService.deleteContact(id).subscribe((res)=>{
    alert("Contact deleted successfully!");
    this.newItemEvent.emit("successful");
  })
}

  OnConfirm() {
    this.DeleteContact(this.contactDetails.id);
  }
}