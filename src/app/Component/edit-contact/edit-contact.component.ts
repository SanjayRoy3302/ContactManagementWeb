import { Component, inject, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactDetails } from '../../Models/contact-details';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../Service/common.service';

@Component({
  selector: 'app-edit-contact',
  standalone: false,
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private matDialog: MatDialog, private contactService: ContactRespositoryService, private commonService: CommonService){
    debugger;
    // this.contactServices = inject(ContactRespositoryService);
    // this.contactServices = contactService;
    this.contactDetails = data;
  }
  contactDetails!: ContactDetails;
  contactDetailsForm!: FormGroup;
  formValues!: ContactDetails;
  ngOnInit(): void {
    debugger;
    this.resetFormState();
    this.contactDetailsForm.patchValue(this.contactDetails);

  }

  resetFormState()
  {
    this.contactDetailsForm = new FormGroup({
      id: new FormControl(0),
      firstname:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Za-z])[A-Za-z0-9]+$')]),
      lastname:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Za-z])[A-Za-z0-9]+$')]),
      email:new FormControl('', [Validators.required, Validators.email])
    });
  }

  closeModal() {
    this.matDialog.closeAll();
  }

  OnSubmit() {
    debugger;
    console.log(this.contactDetailsForm?.value);
    if(this.contactDetailsForm.invalid)
    {
      return alert("Please fill all fields");
    }
    else
    {
      this.formValues = this.contactDetailsForm.value;
      this.contactService.updateContact(this.formValues.id, this.formValues).subscribe((result)=> {
        alert("Contact updated successfully!");
        this.contactDetailsForm.reset();
        this.closeModal();
        this.commonService.ReloadCurrentRoute();
      });
    }
  }

 


}
