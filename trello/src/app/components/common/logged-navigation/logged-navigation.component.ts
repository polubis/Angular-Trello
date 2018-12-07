import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { RequestService } from "src/app/services/request.service";
import { BreadCrumbsService } from "src/app/services/beadcrumbs.service";
import { distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-logged-navigation',
  templateUrl: './logged-navigation.component.html',
  styleUrls: ['./logged-navigation.component.scss']
})
export class LoggedNavigationComponent implements OnInit, OnDestroy {
  path: string;
  subscription: Subscription;
  constructor(private authService: AuthService, private router: Router, private requestService: RequestService,
    private beadCrumbsService: BreadCrumbsService) { }

  ngOnInit() {
    this.subscription = this.beadCrumbsService.currentBreadCrubs.pipe(distinctUntilChanged()).subscribe((path: any) => {
      this.path = path;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout = () => {
    this.authService.deleteCookie("auth");
    this.router.navigate(["/"]);
  }
}
