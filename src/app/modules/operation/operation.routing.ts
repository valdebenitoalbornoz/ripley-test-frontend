import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { OperationComponent } from './operation.component';
import { OperationGuard } from './operation.guard';
import { TransactionsComponent } from './transactions/transactions.component';



const routes: Routes = [
    {
        path: '',
        component: OperationComponent,
        canActivate: [ OperationGuard ],
        children: [
            {
                path: 'transactions',
                component: TransactionsComponent
            },
            {
                path: 'contacts',
                component: ContactsComponent
            },
            {
                path: '',
                redirectTo: 'transactions',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
