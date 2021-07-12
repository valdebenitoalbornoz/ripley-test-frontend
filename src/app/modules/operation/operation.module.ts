import { NgModule } from '@angular/core';
import { TransactionsComponent } from './transactions/transactions.component';
import { RoutingModule } from './operation.routing';
import { SharedModule } from '../shared/shared.module';
import { OperationComponent } from './operation.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from 'src/app/interceptors/auth.interceptor';
import { TransactionFormComponent } from './transactions/components/transaction-form/transaction-form.component';
import { ContactDetailComponent } from './contacts/components/contact-detail/contact-detail.component';
import { TransactionsListComponent } from './transactions/components/transactions-list/transactions-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsListComponent } from './contacts/components/contacts-list/contacts-list.component';
import { ContactFormComponent } from './contacts/components/contact-form/contact-form.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    OperationComponent,
    TransactionFormComponent,
    ContactDetailComponent,
    TransactionsListComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class OperationModule { }
