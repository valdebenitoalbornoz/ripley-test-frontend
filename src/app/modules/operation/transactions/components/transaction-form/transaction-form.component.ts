import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IContact } from 'src/app/interfaces/Contact';
import { ContactService } from 'src/app/services/contact.service';
import { OperationService } from 'src/app/services/operation.service';
import { ContactFormComponent } from '../../../contacts/components/contact-form/contact-form.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  public form: FormGroup;
  public contacts: IContact[] = [];
  @Input() selectedContact: IContact | null = null;
  @Input() showResetButton = true;
  @Output() onsubmit = new EventEmitter();
  constructor(
    _formBuilder: FormBuilder,
    private _service: OperationService,
    private _contactService: ContactService,
    private _modal: NgbModal
  ) {
    this.form = _formBuilder.group({
      receiver: [null,  Validators.required ],
      amount: [ null, [ Validators.required, Validators.min(1)] ],
    });
  }
  /** Typehead */
  formatter = (contact: IContact) => contact.name;
  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map((term: string) => this.contacts
      .filter(contact => new RegExp(term, 'mi').test(contact.name) || new RegExp(term, 'mi').test(contact.rut)))
  )


  ngOnInit(): void {
    this.getContacts();
    this.setReceiver(this.selectedContact);
  }

  setReceiver(contact: IContact | null) {
    this.form.controls.receiver.setValue(contact ? contact._id : null);
    if (!contact) {
      this.selectedContact = null;
    }
  }

  onSelectContact(contact: NgbTypeaheadSelectItemEvent): void {
    const item = contact.item;
    this.selectedContact = item;
    this.setReceiver(item)
  }

  getContacts() {
    this._contactService.getContacts()
      .subscribe((res: any) => {
        if (res.done) {
          this.contacts = res.contacts || [];
          if (!this.contacts.length) {
            this.form.controls.receiver.disable();
          } else {
            this.form.controls.receiver.enable();
          }
        }
      });
  }

  async sendTransaction() {
    if (this.form.invalid) {
      return;
    }
    const value = this.form.getRawValue();
    const response = await swal.fire({
      title: 'Realizar Transferencia',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      icon: 'question',
      html: `¿Está seguro de realizar esta transferencia a ${ this.selectedContact?.name }
      por <b>$ ${ value.amount }</b>?`
    });
    if (response.dismiss) {
      return;
    }
    this._service.sendTransaction(this.form.value)
      .subscribe((res: any) => {
        swal.fire({
          title: res.done ? 'Transferencia realizada' : 'Atención',
          text: res.message,
          icon: res.done ? 'success' : 'warning',
          confirmButtonText: 'Continuar'
        });
        if (res.done) {
          this.onsubmit.emit(res.contact);
        }
        
      }, error => {
        swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error'
        });
      });
  }

  newContact() {
    const modal = this._modal.open(ContactFormComponent, { animation: true, centered: true });
    modal.componentInstance.onsubmit.subscribe((contact: IContact) => {
      this.getContacts();
      modal.close();
      this.selectedContact = contact;
      this.setReceiver(contact);
    });
  }

  close() {
    this._modal.dismissAll();
  }
}


