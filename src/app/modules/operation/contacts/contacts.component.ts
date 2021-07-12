import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IContact } from 'src/app/interfaces/Contact';
import { ContactService } from 'src/app/services/contact.service';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: IContact[] = [];
  constructor(
    private _service: ContactService,
    private _modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this._service.getContacts()
      .subscribe((res: any) => {
        if (res.done) {
          this.contacts = res.contacts || [];
        }
      });
  }

  newContact() {
    const modal = this._modal.open(ContactFormComponent, { animation: true, centered: true });
    modal.componentInstance.onsubmit.subscribe((contact: IContact) => {
      this.getContacts();
      modal.close();
    });
  }

}
