import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

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