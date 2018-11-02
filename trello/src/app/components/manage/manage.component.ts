import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  isSideBarExpanded: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.setProjectId(this.activatedRoute.snapshot.params['id']);
  }

  togleSideBar(){
    this.isSideBarExpanded = !this.isSideBarExpanded;
  }

}
