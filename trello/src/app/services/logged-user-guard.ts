import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";

@Injectable()
export class LoggedUserGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}

    canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const isAuth = this.authService.isAuthenticated;
        if(isAuth){
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
    }
}