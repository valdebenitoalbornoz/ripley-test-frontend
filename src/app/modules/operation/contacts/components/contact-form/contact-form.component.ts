import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bank } from 'src/app/interfaces/Bank';
import { IContact } from 'src/app/interfaces/Contact';
import { ContactService } from 'src/app/services/contact.service';
import swal from 'sweetalert2';
import { defaultBanks } from '../../../../../config';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  form: FormGroup;
  banks: Bank[] = defaultBanks;
  accountTypes = [ 'CUENTA VISTA', 'CUENTA CORRIENTE', 'CUENTA RUT' ];
  @Output() onsubmit = new EventEmitter<IContact>();
  constructor(
    _formBuilder: FormBuilder,
    private _service: ContactService,
    private _modal: NgbActiveModal
  ) {
    this.form = _formBuilder.group({
      name: [ null, Validators.required ],
      rut: [ null, Validators.required ],
      email: [ null, Validators.email ],
      phone: [ null ],
      bank: [ null, Validators.required ],
      accountType: [ null, Validators.required ],
      accountNumber: [ null, Validators.required ]
    });
  }

  ngOnInit(): void {
    this.getBanks();
  }

  newContact() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._service.addContacts(this.form.value)
      .subscribe((res: any) => {
        swal.fire({
          title: res.done ? 'Guardado' : 'Atención',
          text: res.message,
          icon: res.done ? 'success' : 'warning',
          confirmButtonText: 'Continuar'
        });
        this.onsubmit.emit(res.contact);
      }, error => {
        swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error'
        });
      })
  }

  getBanks() {
    this._service.getBanks()
      .subscribe((res: any) => {
        this.banks = res.banks || [];
      }, error => {
        this.banks = defaultBanks;
      });
  }
  close() {
    this._modal.dismiss();
  }

}
