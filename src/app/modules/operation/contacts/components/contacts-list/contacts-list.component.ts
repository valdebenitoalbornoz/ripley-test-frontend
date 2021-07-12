import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IContact } from 'src/app/interfaces/Contact';
import { ContactService } from 'src/app/services/contact.service';
import { TransactionFormComponent } from '../../../transactions/components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  @Input() contacts: IContact[] = [];
  constructor(
    private _contactService: ContactService,
    private _modal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  trasferTo(contact: IContact): void {
    const modal = this._modal.open(TransactionFormComponent, { centered: true, animation: true, size: 'lg' });
    modal.componentInstance.selectedContact = contact;
    modal.componentInstance.showResetButton = false;
    modal.componentInstance.onsubmit.subscribe(() => {
      modal.close();
    });

  }

}
