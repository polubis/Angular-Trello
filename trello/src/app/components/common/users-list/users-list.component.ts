import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, EventEmitter, Output, SimpleChanges } from "@angular/core";
import { userPicturesBasePath, editUserDataFormSettings } from '../../../constants/constants';
import { UsersService } from "src/app/services/users.service";
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {
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
  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.isDeleting.currentValue !== simpleChanges.isDeleting.previousValue &&
      !simpleChanges.isDeleting.currentValue) {
      this.personToDeleteIndex = -1;
      this.currentOpenedUserCartIndex = -1;

    }
  }
  ngOnInit() {
  }
  togleRemovePersonFromProject(index: number) {
    this.personToDeleteIndex = index;
  }
}
