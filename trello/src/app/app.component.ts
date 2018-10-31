import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "trello";
  isAuthenticated: boolean = false;
  subscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.subscription = this.authService.onAuthenticateChanges.subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
