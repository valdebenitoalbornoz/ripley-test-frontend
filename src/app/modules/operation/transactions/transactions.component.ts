import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITransaction } from 'src/app/interfaces/Transaction';
import { OperationService } from 'src/app/services/operation.service';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: ITransaction[] = [];
  constructor(
    private _service: OperationService,
    private _modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this._service.getTransactions()
      .subscribe((res: any) => {
        if (res.done) {
          this.transactions = res.transactions || [];
        }
      });
  }

  newTransfer() {
    const modal = this._modal.open(TransactionFormComponent, { animation: true, centered: true, size: 'lg' });
    modal.componentInstance.onsubmit.subscribe((res: any) => {
      modal.close();
      this.getTransactions();
    })
  }

}
