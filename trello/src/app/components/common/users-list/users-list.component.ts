import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { userPicturesBasePath, editUserDataFormSettings } from '../../../constants/constants';
import { UsersService } from "src/app/services/users.service";
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users: any[];
  currentOpenedUserCartIndex = -1;
  userPicturesBasePath = userPicturesBasePath;
  constructor(private usersService: UsersService) { }
  togleUserDetails(event, index: number){
    event.stopPropagation();
    this.currentOpenedUserCartIndex = index;
  }
  ngOnInit() {
  }

}
