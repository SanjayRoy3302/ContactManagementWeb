import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ContactDetails } from '../Models/contact-details';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
contactDetails!:ContactDetails;
eventEmitter!: EventEmitter<string>;
  constructor(private router: Router) { }

  ReloadCurrentRoute() {
    debugger;
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  GetLastObjectIfUndefined(details: ContactDetails)
  {
    this.contactDetails = details;
  }

  GetOutputEventIfUndefined(eventEmitter: EventEmitter<string>)
  {
    this.eventEmitter = eventEmitter;
  }
}
