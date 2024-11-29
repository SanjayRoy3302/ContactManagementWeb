import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { ContactDetails } from '../../Models/contact-details';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../Service/common.service';

@Component({
  selector: 'app-edit-contact',
  standalone: false,
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit{
  constructor(private contactService: ContactRespositoryService, private commonService: CommonService){
  }
  contactDetails!: ContactDetails;
  contactDetailsForm!: FormGroup;
  formValues!: ContactDetails;
  @Output() newItemEvent = new EventEmitter<string>();
  ngOnInit(): void {
    this.resetFormState();
    if(this.contactDetailsForm!==undefined)
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
    this.newItemEvent.emit("close");
    this.commonService.GetOutputEventIfUndefined(this.newItemEvent);
  }

  @Input('SetData')set dataForUpdate(data: any) {
    debugger;
    this.contactDetails = data;
    if(this.contactDetailsForm!==undefined)
      this.contactDetailsForm.patchValue(this.contactDetails);
    console.log(data);
};

  OnSubmit() {
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
        this.newItemEvent.emit("successful");
        this.contactDetailsForm.reset();
      });
    }
  }
}
