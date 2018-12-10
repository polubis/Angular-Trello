import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from "@angular/core";
import { userPicturesBasePath, editUserDataFormSettings } from '../../../constants/constants';
import { UsersService } from "src/app/services/users.service";
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users: any[];
  @Input() isDeleting: boolean;
  @Output() deleting = new EventEmitter<any>();
  currentOpenedUserCartIndex = -1;
  userPicturesBasePath = userPicturesBasePath;
  personToDeleteIndex = -1;
  constructor(private usersService: UsersService) { }
  togleUserDetails(event, index: number){
    event.stopPropagation();
    this.currentOpenedUserCartIndex = index;
  }
  ngOnInit() {
  }
  togleRemovePersonFromProject(index: number) {
    this.personToDeleteIndex = index;
  }
}
