

import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { Router } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
@Injectable()
export class NotLoggedUserGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isAuth = this.authService.isAuthenticated;
    if (!isAuth) {
      return true;
    } else {
      this.router.navigate(["/projects"]);
      return false;
    }
    
  };
}