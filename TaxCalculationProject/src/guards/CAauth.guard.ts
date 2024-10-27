import { Injectable } from "@angular/core";
import { CanActivate, Router} from "@angular/router";
import { AuthService } from "../service/auth.service";
import { AuthGuard } from "./auth.guards";

@Injectable({
    providedIn : 'root'
})

export class CAauthGuard implements CanActivate {
    constructor(private authservice : AuthService, private router: Router){}

    canActivate():boolean{

        if (localStorage.getItem(this.authservice.authenticated) == 'CA') {
            return true;
        } 
        else if(localStorage.getItem(this.authservice.authenticated) == 'user') {
            this.router.navigate(['dashboard']);
            return true;
        }
        else{
            this.router.navigate(['login']);
            return false;
        }
    }
}