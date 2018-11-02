import { Component, OnInit } from '@angular/core';
import { TasksService } from "src/app/services/tasks.service";
import { Input } from "@angular/core";
import { TaskModel } from "src/app/models/task.model";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService) { }
  bucketsNames: string[] = ["To do", "In Progress", "Done"];
  bucketsListsKeys: string[] = [];
  buckets: any = null;
  isDownloadingTasks: boolean = true;
  projectId: number;
  ngOnInit() {
    this.tasksService.onChangeTasks.subscribe((buckets: any) => {
      if(this.isDownloadingTasks)
        this.isDownloadingTasks = false;
      this.buckets = buckets;
      this.bucketsListsKeys = Object.keys(buckets);
    });
    this.tasksService.getTasksForProject();
    this.projectId = this.tasksService.projectId;
  }

}
