import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  id: number = 30142;
  isSideBarExpanded: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  togleSideBar(){
    this.isSideBarExpanded = !this.isSideBarExpanded;
  }

}
