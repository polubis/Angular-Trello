import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskModel } from "src/app/models/task.model";
import { Input } from "@angular/core";
import { addTaskFormSettings, findUserFormSettings } from '../../../constants/constants';
import FormModel from "src/app/models/form.model";
import { TasksService } from "src/app/services/tasks.service";
import { ProjectsService } from "src/app/services/projects.service";
import { OperationsService } from "src/app/services/operations.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";
@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"]
})
export class TasksListComponent implements OnInit, OnDestroy {
  @Input() items: TaskModel[];
  @Input() limit: number;
  @Input() projectId: number;
  isSavingTaskColor: boolean = false;
  currentOpenedColorsIndex: number = -1;
  isDeleteTaskPromptOpen: boolean = false;
  isEditTaskModalOpen: boolean = false;
  isEditingTask: boolean = false;
  isDeletingTask: boolean = false;
  isAddingTask: boolean = false;
  isAddTaskModalOpen: boolean = false;
  editTaskFormSettings: FormModel[] = [...addTaskFormSettings];
  addTaskFormSettings: FormModel[] = [...addTaskFormSettings];
  findUserFormSettings: FormModel[] = [...findUserFormSettings];
  idOfTaskToAssign: number = -1;
  isAssigningToTask: boolean = false;

  isLoadingUsers: boolean = false;

  taskToChange: number = -1;
  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private operationsService: OperationsService,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {}

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      if (this.currentOpenedColorsIndex !== -1)
        this.currentOpenedColorsIndex = -1;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveTaskColor = (color: string) => {
    const index = this.items.findIndex(
      item => item.id === this.currentOpenedColorsIndex
    );

    const name: string = this.items[index].name;
    const description: string = this.items[index].description;
    this.isSavingTaskColor = true;
    this.tasksService
      .editColor({ name, description, color }, this.items[index].id)
      .then((response: any) => {
        this.isSavingTaskColor = false;
        this.currentOpenedColorsIndex = -1;
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.isSavingTaskColor = false));
  };

  togleColorPalette(id: number) {
    this.currentOpenedColorsIndex =
      this.currentOpenedColorsIndex !== id ? id : -1;
  }

  changeTaskColor(color: string, id: number) {
    const index = this.items.findIndex(item => item.id === id);
    this.items[index].color = color;
  }

  deleteTask() {
    this.isDeleteTaskPromptOpen = false;
    this.isDeletingTask = true;
    this.tasksService
      .deleteTask(this.items[this.taskToChange].id)
      .then((response: any) => {
        this.items.splice(this.taskToChange, 1);
        this.isDeletingTask = false;
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.isDeletingTask = false));
  }

  editTask = (formData: any) => {
    this.isEditingTask = true;
    this.tasksService
      .editTask(formData, this.items[this.taskToChange].id)
      .then((response: TaskModel) => {
        const copiedItem = { ...this.items[this.taskToChange] };
        copiedItem.name = formData[0].value;
        copiedItem.description = formData[1].value;
        copiedItem.color = formData[2].value;
        this.items[this.taskToChange] = copiedItem;
        this.isEditingTask = false;
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.isEditingTask = false));
  };
  togleEditTaskModal(id: number) {
    const copiedEditFormSettings: FormModel[] = [...this.editTaskFormSettings];
    const index = this.items.findIndex(item => item.id === id);
    if (!this.isEditTaskModalOpen) {
      copiedEditFormSettings[0].initialValue = this.items[index].name;
      copiedEditFormSettings[1].initialValue = this.items[index].description;
      copiedEditFormSettings[2].initialValue = this.items[index].color;
      this.editTaskFormSettings = copiedEditFormSettings;
      this.taskToChange = index;
    } else {
      copiedEditFormSettings[0].initialValue = null;
      copiedEditFormSettings[1].initialValue = null;
      copiedEditFormSettings[2].initialValue = null;
    }

    this.isEditTaskModalOpen = !this.isEditTaskModalOpen;
  }
  togleDeleteTaskPrompt(id: number) {
    this.taskToChange = this.items.findIndex(item => item.id === id);

    this.isDeleteTaskPromptOpen = !this.isDeleteTaskPromptOpen;
  }

  togleAddTaskModal() {
    this.isAddTaskModalOpen = !this.isAddTaskModalOpen;
  }

  addTask = (formData: any) => {
    this.isAddingTask = true;
    const idOfProject = this.projectId
      ? this.projectId
      : this.projectsService.currentWatchedProjectId;
    this.tasksService
      .addTask(formData, idOfProject)
      .then((response: TaskModel) => {
        this.items.push(response);
        this.isAddingTask = false;
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.isAddingTask = false));
  };

  togleAssignToTaskPersonModal = (id: number) => {
    if (this.idOfTaskToAssign === -1) {
      this.isLoadingUsers = true;
      const idOfProject = this.projectId
        ? this.projectId
        : this.projectsService.currentWatchedProjectId;

      this.usersService
        .getUsers(idOfProject)
        .then((response: any) => {
          this.findUserFormSettings[0].listElements = response.members;
          this.isLoadingUsers = false;
        })
        .catch(error => {
          this.isLoadingUsers = false;
        });
    }

    this.idOfTaskToAssign = this.idOfTaskToAssign === -1 ? id : -1;
  };

  assignToTaskPerson = (formData: any) => {
    console.log(formData);
    this.isAssigningToTask = true;
  //   const model = { taskId: this.idOfTaskToAssign, userId: formData[0].value };
  //   this.tasksService
  //     .assignPersonToTask(model)
  //     .then(response => {
  //       this.isAssigningToTask = false;
  //     })
  //     .catch(error => (this.isAssigningToTask = false));
  // };
  }
}
