import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from "src/app/services/tasks.service";
import { Input } from "@angular/core";
import { TaskModel } from "src/app/models/task.model";
import FormModel from "src/app/models/form.model";
import { labelFormSettings } from '../../../constants/constants';
import { Subscription } from "rxjs";
import { ProjectsService } from "src/app/services/projects.service";
import { ProjectModel } from "src/app/models/project.model";
import { OperationsService } from "src/app/services/operations.service";
@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit, OnDestroy {
  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private operationsService: OperationsService
  ) {}
  bucketsNames: string[] = ["To do", "In Progress", "Done"];
  bucketsListsKeys: string[] = [];
  buckets: any = null;
  isDownloadingTasks: boolean = true;
  projectId: number;
  isAddLabelModalOpen: boolean = false;
  isAddingLabel: boolean = false;
  labelFormSettings: FormModel[] = [...labelFormSettings];
  projectLabels: { name: string; color: string; icon: string }[] = [];

  tasksSubscription: Subscription;
  ngOnInit() {
    this.tasksSubscription = this.tasksService.onChangeTasks.subscribe(
      (project: any) => {
        if (this.isDownloadingTasks) this.isDownloadingTasks = false;
        this.buckets = project.buckets;
        this.projectLabels = project.labels;
        this.bucketsListsKeys = Object.keys(project.buckets);
      }
    );

    this.tasksService.getTasksForProject();
    this.projectId = this.tasksService.projectId;
  }

  togleAddLabelModal() {
    this.isAddLabelModalOpen = !this.isAddLabelModalOpen;
  }

  addLabel = (formData: any) => {
    this.isAddingLabel = true;
    this.projectsService
      .addLabelIntoProject(this.tasksService.projectId, formData)
      .then((response: {name: string, icon: string, color: string}) => {
        this.isAddingLabel = false;
        this.projectLabels.push(response);
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.isAddingLabel = false));
  };

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }
}
