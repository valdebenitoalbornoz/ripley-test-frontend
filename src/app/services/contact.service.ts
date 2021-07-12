import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IContact } from '../interfaces/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /** Add Contact */
  public addContacts(contact: IContact) {
    return this.http.post(`${this.apiUrl}/contact`, contact);
  }
  /** Get Contacts */
  public getContacts() {
    return this.http.get(`${this.apiUrl}/contacts`);
  }

  public getBanks() {
    return this.http.get(`https://bast.dev/api/banks.php`);
  }
}
