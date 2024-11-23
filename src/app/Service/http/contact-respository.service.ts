import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactDetails } from '../../Models/contact-details';

@Injectable({
  providedIn: 'root'
})
export class ContactRespositoryService {
  private apiUrl = "https://localhost:44316/api/ContactDetails";
  constructor() { }
  http = inject(HttpClient);

  getContactDetails() {
    return this.http.get<ContactDetails[]>(this.apiUrl+'/GetAllContacts');
  }

  saveContact(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateContact(id:number, data: any) {
    return this.http.put(this.apiUrl+"/"+id, data);
  }

  deleteContact(id: number){
    return this.http.delete(this.apiUrl+"/"+id)
  }
}
