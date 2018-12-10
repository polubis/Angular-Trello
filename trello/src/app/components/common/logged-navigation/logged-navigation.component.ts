import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { editUserDataFormSettings } from '../../../constants/constants';
@Component({
  selector: 'app-logged-navigation',
  templateUrl: './logged-navigation.component.html',
  styleUrls: ['./logged-navigation.component.scss']
})
export class LoggedNavigationComponent implements OnInit, OnDestroy {
  isEditUserDataModalOpen = false;
  editUserDataFormSettings = [...editUserDataFormSettings];
  isEditingUserData = false;
  path: string;
  subscription: Subscription;
  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.subscription = this.router.events.subscribe(() => {
      this.path = document.location.pathname;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout = () => {
    this.authService.deleteCookie("auth");
    this.router.navigate(["/"]);
  }

  saveUserData = (formData: any) => {
    this.isEditingUserData = true;
    this.usersService.editProfile(formData).then((response: any) => {
      this.isEditingUserData = false;
    }).catch(() => this.isEditingUserData = false);
  }
  togleEditUserModal() {
    this.isEditUserDataModalOpen = !this.isEditUserDataModalOpen;
  }
}
