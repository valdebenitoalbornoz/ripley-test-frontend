import { Component, Input, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/interfaces/Transaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  @Input() transactions: ITransaction[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
