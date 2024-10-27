import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { CAauthGuard } from "./CAauth.guard";

@Injectable({
    providedIn : 'root'
})

export class AuthGuard implements CanActivate{
    constructor(private authservice : AuthService, private router: Router){}

    canActivate():boolean{
        if (localStorage.getItem(this.authservice.authenticated) == 'user') {
            return true;
        } 
        else {
            this.router.navigate(['login']);
            return false;
        }
    }
}