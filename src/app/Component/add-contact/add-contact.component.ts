import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ContactDetails } from '../../Models/contact-details';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { Router } from '@angular/router';
import { CommonService } from '../../Service/common.service';

@Component({
  selector: 'app-add-contact',
  standalone: false,
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent implements OnInit {
  constructor(private matDialog: MatDialog,private contactService: ContactRespositoryService,private router: Router,private commonService: CommonService){
    this.contactServices = inject (ContactRespositoryService);
    this.contactServices = contactService;
  }
  ContactDetails!: Array<ContactDetails>;
  contactDetailsForm!: FormGroup;
  formValues!: ContactDetails;
  contactServices!:ContactRespositoryService;
  popup = false
  @Output() newItemEvent = new EventEmitter<string>();

  ngOnInit(): void {
    debugger;
    this.resetFormState();
  }

  resetFormState()
  {
    this.contactDetailsForm = new FormGroup({
      id: new FormControl(0),
      firstname:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Za-z])[A-Za-z0-9]+$')]),
      lastname:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Za-z])[A-Za-z0-9]+$')]),
      email:new FormControl('', [Validators.required, Validators.email]),
    });
  }

  closeModal() {
    this.newItemEvent.emit("close");
    this.commonService.GetOutputEventIfUndefined(this.newItemEvent);
  }

  OnSubmit() {
    console.log(this.contactDetailsForm?.value);
    if(this.contactDetailsForm.invalid)
    {
      return alert("Please fill all fields");
    }
    if(this.contactDetailsForm.value.id==null || this.contactDetailsForm.value.id==0)
    {
        this.formValues = this.contactDetailsForm.value;
        this.formValues.id=0;
        this.contactServices.saveContact(this.formValues).subscribe((res)=> {
          alert("Contact added successfully!");
          this.newItemEvent.emit("successful");
          this.contactDetailsForm.reset();
        });
    }
  }
}
