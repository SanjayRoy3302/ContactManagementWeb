import { Component, inject, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactRespositoryService } from '../../Service/http/contact-respository.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactDetails } from '../../Models/contact-details';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  standalone: false,
  
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data1:any,private matDialog: MatDialog, private contactService: ContactRespositoryService
  ,private router: Router, private activeRoute: ActivatedRoute){
    debugger;
    this.contactServices = inject(ContactRespositoryService);
    this.contactServices = contactService;
    this.contactDetails = data1;
  }
  contactDetails!: ContactDetails;
  contactDetailsForm!: FormGroup;
  formValues!: ContactDetails;
  contactServices!:ContactRespositoryService;
  @Input() fullval: string = "";

  ngOnInit(): void {
    debugger;
    this.resetFormState();
    this.contactDetailsForm.patchValue(this.contactDetails);

  }

  resetFormState()
  {
    this.contactDetailsForm = new FormGroup({
      id: new FormControl(0),
      firstname:new FormControl('', Validators.pattern('^(?=.*?[A-Za-z])[A-Za-z0-9]+$')),
      lastname:new FormControl('', Validators.pattern('^(?=.*?[A-Za-z])[A-Za-z0-9]+$')),
      email:new FormControl('', [Validators.required, Validators.email]),
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
      this.contactServices.updateContact(this.formValues.id, this.formValues).subscribe((result)=> {
        alert("Contact updated successfully!");
        this.contactDetailsForm.reset();
        this.closeModal();
        this.reloadCurrentRoute();
      });
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}


}
