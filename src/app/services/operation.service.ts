import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ITransaction } from '../interfaces/Transaction';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /** Get my transactions */
  getTransactions() {
    return this.http.get(`${this.apiUrl}/transactions`);
  }
  
  /** Send transaction */
  sendTransaction(transaction: ITransaction) {
    return this.http.post(`${this.apiUrl}/transaction`, transaction);
  }

  /** Get Contacts */
}
