import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users: any[];
  isUserCartOpen: boolean = false;
  constructor() { }
  hideUserDetails(){
    this.isUserCartOpen = false;
  }
  popUpUserDetails(){
    this.isUserCartOpen = true;
  }
  ngOnInit() {
  }

}
