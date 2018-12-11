import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { distinctUntilChanged, take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { editUserDataFormSettings, changePasswordFormSettings } from '../../../constants/constants';
import { User } from "src/app/models/user";
import { RequestService } from "src/app/services/request.service";
import { userPicturesBasePath } from '../../../constants/constants';
import { fromPromise } from "rxjs/internal-compatibility";
import { OperationsService } from "src/app/services/operations.service";
@Component({
  selector: 'app-logged-navigation',
  templateUrl: './logged-navigation.component.html',
  styleUrls: ['./logged-navigation.component.scss']
})
export class LoggedNavigationComponent implements OnInit, OnDestroy {
  isEditUserDataModalOpen = false;
  userProfileOpen = false;
  editUserDataFormSettings = [...editUserDataFormSettings];
  isEditingUserData = false;
  isGettingUserData = false;
  isChangingAvatar = false;
  openChangePasswordModal = false;
  isChangingPassword = false;
  path: string;
  subscription: Subscription;
  userData: User;
  userPicturesBasePath = userPicturesBasePath;
  changePasswordFormSettings = [...changePasswordFormSettings];

  constructor(private authService: AuthService, private requestService: RequestService,
    private router: Router, private usersService: UsersService, private operationsService: OperationsService) { }

  toglerItems: any[] = [
    { icon: "person", name: "Profile", id: 2, func: () => this.togleUserProfile() },
    { icon: "edit", name: "Edit your profile", id: 3, func: () => this.togleEditUserModal() }
  ];
  ngOnInit() {
    this.subscription = this.router.events.subscribe(() => {
      this.path = document.location.pathname;
    });
  }

  togleUserProfile() {
    this.userProfileOpen = !this.userProfileOpen;
    if (!this.userData) {
      this.isGettingUserData = true;
      this.getUserData();
    }
  }

  getUserData() {
    this.requestService.executeRequest('getLoggedUserData', 'get', {}, "", "", {})
      .then((response: User) => {
        this.userData = response;
        this.isGettingUserData = false;
      }).catch(error => {
        this.isGettingUserData = false;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      this.isEditUserDataModalOpen = false;
      this.userProfileOpen = true;
      this.getUserData();
    }).catch(() => this.isEditingUserData = false);
  }

  changeAvatar(file: any) {
    this.isChangingAvatar = true;
    const formData = [
      {value: this.userData.firstName},
      {value: this.userData.lastName},
      {value: file}
    ];
    this.usersService.editProfile(formData).then((response: any) => {
      this.isChangingAvatar = false;
      this.operationsService.removeAllAfterDelay(3000);
      const user = {...this.userData};
      user.picturePath = response.picturePath;
      this.userData = user;
    }).catch(error => {
      this.isChangingAvatar = false;
    })
  }

  togleEditUserModal() {
    this.isEditUserDataModalOpen = !this.isEditUserDataModalOpen;
  }

  handleTogleRowClick(data: any) {
    const index = this.toglerItems.findIndex(x => x.icon === data.icon);
    this.toglerItems[index].func();
  }

  openEditDetails() {
    this.userProfileOpen = false;
    this.isEditUserDataModalOpen = true;
  }
  togleChangePasswordModal() {
    this.userProfileOpen = !this.userProfileOpen;
    this.openChangePasswordModal = !this.openChangePasswordModal;
  }

  changePassword = (formData: any) => {
    this.isChangingPassword = true;
    this.usersService.changePassword(formData).then(response => {
      this.isChangingPassword = false;
      this.openChangePasswordModal = false;
      this.userProfileOpen = true;
    }).catch(error => {
      this.isChangingPassword = false;
    });
  }
}
