import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  /** Login */
  public login(rut: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { rut, password });
  }
  /** Register */
  public register(user: IUser) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  /** Setting Token in LocalStorage */
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  /** Getting Token from LocalStorage */
  public getToken() {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate([ 'login' ]);
  }
}
