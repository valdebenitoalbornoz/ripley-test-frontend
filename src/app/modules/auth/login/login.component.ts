import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(
    _formBuilder: FormBuilder,
    private _service: AuthService,
    private _router: Router
  ) {
    this.form = _formBuilder.group({
      rut: [ null, Validators.required ],
      password: [ null, Validators.required ],
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { rut, password } = this.form.value;
    swal.fire({
      title: 'Ingresando...',
      allowEscapeKey: false,
      allowOutsideClick: false
    });
    swal.showLoading();
    this._service.login(rut, password)
      .subscribe((res: any) => {
        if (res.done) {
          this._service.setToken(res.token);
          this._router.navigate([ 'operation' ]);
        } else {
          swal.fire({
            icon: 'warning',
            text: res.message,
            title: 'Atención'
          });
          this.form.reset();
        }
      }, error => { 
        swal.fire({
          icon: 'error',
          text: 'Ha ocurrido un error',
          title: 'Error'
        });
        this.form.reset({ password: null });
      });
  }

}
