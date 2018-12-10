import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { editUserDataFormSettings } from '../../../constants/constants';
import { User } from "src/app/models/user";
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
  userSubscription: Subscription;
  userData: User;

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) { }

  toglerItems: any[] = [
    { icon: "person", name: "Profile", id: 2 },
    { icon: "edit", name: "Edit your profile", id: 3, func: () => this.togleEditUserModal() },
    { icon: "security", name: "Change password", id: 4 },
  ];
  ngOnInit() {
    this.subscription = this.router.events.subscribe(() => {
      this.path = document.location.pathname;
    });
    this.userSubscription = this.authService.userData.subscribe((user: User) => {
      this.userData = user;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  logout = () => {
    this.authService.deleteCookie("auth");
    this.authService.deleteCookie("userId");
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

  handleTogleRowClick(data: any) {
    const index = this.toglerItems.findIndex(x => x.icon === data.icon);
    this.toglerItems[index].func();
  }
}
