import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CAauthGuard } from './CAauth.guard';
import { AuthGuard } from './auth.guards';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CombinedAuthGuard implements CanActivate {

  constructor(private authservice:AuthService, private router: Router) {}

  canActivate() : boolean{
    if (localStorage.getItem(this.authservice.authenticated) == 'CA' || localStorage.getItem(this.authservice.authenticated) == 'user') {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
