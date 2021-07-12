import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { defaultBanks } from 'src/app/config';
import { Bank } from 'src/app/interfaces/Bank';
import { IContact } from 'src/app/interfaces/Contact';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  banks: Bank[] = defaultBanks;
  accountTypes = [ 'CUENTA VISTA', 'CUENTA CORRIENTE', 'CUENTA RUT' ];
  @Output() onsubmit = new EventEmitter<IContact>();
  constructor(
    private _formBuilder: FormBuilder,
    private _service: AuthService,
    private _router: Router
  ) {
    this.form = this._formBuilder.group({});
  }

  validator(group: FormGroup) {
    const value = group.value;
    if (!value.password) {
      return { password: 'Ingrese contraseña' }
    }
    if (!value.password2) {
      return { password: 'Reingrese su contraseña' }
    }

    if (value.password !== value.password2) {
      return { password: 'Las contraseñas no coinciden' };
    }
    return null;

  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [ null, Validators.required ],
      rut: [ null, Validators.required ],
      password: [ null, Validators.required ],
      password2: [ null, Validators.required ],
    }, { validator: this.validator });
  }

  save() {
    this._service.register(this.form.value)
      .subscribe((res: any) => {
        if (res.done) {
          swal.fire({
            icon: 'success',
            text: res.message,
            title: 'Usuario registrado'
          })
          this._router.navigate([ 'login'])
        } else {
          swal.fire({
            icon: 'warning',
            text: res.message,
            title: 'Atención'
          })
        }
      }, error => { 
        swal.fire({
          icon: 'error',
          text: error.error.message,
          title: 'Error'
        })
      })

  }

}
