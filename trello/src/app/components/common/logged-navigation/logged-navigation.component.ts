import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { RequestService } from "src/app/services/request.service";

@Component({
  selector: 'app-logged-navigation',
  templateUrl: './logged-navigation.component.html',
  styleUrls: ['./logged-navigation.component.scss']
})
export class LoggedNavigationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private requestService: RequestService) { }

  ngOnInit() {

  }

  logout = () => {
    this.authService.deleteCookie("auth");
    this.router.navigate(["/"]);
  }
}
