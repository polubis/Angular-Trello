import { Component, OnInit } from '@angular/core';
import { TaskModel } from "src/app/models/task.model";
import { Input } from "@angular/core";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() items: TaskModel[];
  @Input() limit: number;

  constructor() { }

  ngOnInit() {
  }

}
