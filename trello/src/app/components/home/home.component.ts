import { Component, OnInit } from '@angular/core';
import { loginFormSettings, registerFormSettings } from '../../constants/constants';
import FormModel from '../../models/form.model';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { OperationsService } from '../../services/operations.service';
import { User } from "src/app/models/user";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  toglerItems: any[] = [
    { icon: "info", name: "About" },
    { icon: "phone", name: "Contact" },
    { icon: "highlight", name: "Policy" }
  ];
  isLoginModalOpen: boolean = false;
  loginFormSettings: FormModel[] = loginFormSettings;
  registerFormSettings: FormModel[] = registerFormSettings;
  isDoingRequest: boolean = false;
  isRegisterModalOpen: boolean = false;

  constructor(private requestService: RequestService, private authService: AuthService, private router: Router,
    private operationsService: OperationsService) {}
  ngOnInit() {}

  togleRegisterModal() {
    this.isRegisterModalOpen = !this.isRegisterModalOpen;
    if (!this.isRegisterModalOpen) this.operationsService.clearAllOperations();
  }

  togleLoginModal() {
    this.isLoginModalOpen = !this.isLoginModalOpen;
    if (!this.isLoginModalOpen) this.operationsService.clearAllOperations();
  }

  logIn = (loginData: any) => {
    this.isDoingRequest = true;
    this.requestService
      .executeRequest("login", "post", loginData, "", "", {})
      .then((user: User) => {
        this.authService.setCookie("auth", 1, "/", "true");
        this.authService.setCookie("userId", 1, "/", user.id);
        this.authService.setUserData(user);
        this.isDoingRequest = false;
        this.router.navigate(["/projects"]);
      })
      .catch(() => (this.isDoingRequest = false));
  }

  register = (registerData: any) => {
    this.isDoingRequest = true;
    this.requestService
      .executeRequest("register", "post", registerData, "Pomyślnie udało się zarejestrować", "", {})
      .then(response => {
        this.isDoingRequest = false;
        this.isRegisterModalOpen = false;
        this.isLoginModalOpen = true;
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(() => (this.isDoingRequest = false));
  }
}
