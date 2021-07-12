import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OperationGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router  
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const isLogged = this._authService.getToken() !== null;
      if (!isLogged) {
        this._router.navigate([ 'login' ])
      }
      return true;
  }
  
}
