import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationGuard } from './modules/operation/operation.guard';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'operation',
        canActivate: [ OperationGuard ],
        loadChildren: () => import('./modules/operation/operation.module').then(m => m.OperationModule)
    },
    {
        path: '**',
        redirectTo: ''
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }